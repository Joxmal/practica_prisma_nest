import { join } from 'path';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateFilePostDto } from './dto/filePost/create-filePost.dto';
import { existsSync } from 'fs';
import { FileService } from 'src/common/files/filesServices';


@Injectable()
export class PostService {

  constructor(
    private prisma:PrismaService,
    private readonly fileService: FileService
  ){}


  async create(createPostDto: CreatePostDto) {

    let filesPost: {id: number}[]
    if(createPostDto?.filesPost){
      filesPost = createPostDto.filesPost.map(file => {
        return {
          id: file
        }
      })
    }

    console.log(filesPost)

    let cooperadorDto: {id: number}[]
    if(createPostDto?.patrocinador){
      cooperadorDto = createPostDto.patrocinador.map(id => {
        return {
          id: id
        }
      })
    }


    delete createPostDto.filesPost
    delete createPostDto.patrocinador

    const existinPost = await this.prisma.post.findFirst({
      where: {
        title: createPostDto.title   
      },
    });

    if(existinPost){
      throw new ConflictException('POST YA EXISTE');
    }

    try {
     return await this.prisma.post.create({
        data:{
          ...createPostDto,
          files:{
            connect:  filesPost
          },
          cooperador:{
            connect: cooperadorDto
          }
        },
        include:{
          author: {
            select: {
              id: true,
              name: true,
              createdAt: true
            },
          },
          files: {
            select:{
              id: true,
              filename: true,
              size: true
            }
          },
          cooperador:{
            select:{
              id:true,
              nombre: true,
            }
          } 
        }
      })
    } catch (error) {
      if(error.meta.field_name === "posts_authorID_fkey (index)")
        throw new ConflictException('EL AUTOR NO EXISTE')

      this.handlerFileRecordsError({error,fileDtoExpected:filesPost.length})
      console.log(error)
      throw new Error('OCURRIO UN ERROR AL GUARDAR EL POST')

    }
  }

  findAll() {
    return this.prisma.post.findMany({orderBy:{id:'asc'}}) ;
  }

  async findOne(id: number) {
     const post = await this.prisma.post.findUnique({
      include:{
        author:{
          select: {
            id: true,
            name: true,
            createdAt: true
          },
        },
        files: true
      },
      where: {
        id: id,
      },
    });

    if(!post){
      throw new NotFoundException('POST NO ENCONTRADO');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {

    const existinPost = await this.findOne(id)

    console.log(updatePostDto)

    const filesPostExist = existinPost.files.map(file => {
      return {
        id: file.id
      }
    })

    let filesPostUpdate:{id: number}[]
    if(updatePostDto?.filesPost){
      filesPostUpdate = updatePostDto.filesPost.map(file => {
        return {
          id: file
        }
      })
    }
    let cooperadorUpdate:{id: number}[]
    if( updatePostDto?.patrocinador){
      cooperadorUpdate = updatePostDto.patrocinador.map(id => {
        return {
          id:id
        }
      })
    }
    try {

      delete updatePostDto.filesPost

    const updatePost = await this.prisma.post.update({
      where: {id:existinPost.id},
      data: {
        ...updatePostDto,
        files:{
          disconnect: filesPostExist,
          connect: filesPostUpdate,
        },
        cooperador:{
          set : cooperadorUpdate
        }
      },
      include:{
        author: {
          select: {
            id: true,
            name: true,
            createdAt: true
          },
        },
        files: {
          select:{
            id: true,
            filename: true,
            size: true
          }
        },
        cooperador:{
          select:{
            id:true,
            nombre:true
          }
        }
      }
    });
    return updatePost
      
    } catch (error) {
      console.log(error)
      console.log(filesPostExist.length)
      if(error.code === 'P2002' && error.meta.modelName === 'Post'){
        throw new ConflictException(`Ya existe un post con el título ${updatePostDto.title}`)
      }

      this.handlerFileRecordsError({error,fileDtoExpected:filesPostExist.length+1})
    }
  }

  async remove(id: number) {

    try {
      await this.prisma.post.delete({
        where: {
          id: id,
        },
      })

      return {message: 'Post eliminado correctamente'}
    } catch (error) {
      if(error.code === 'P2025'){
        throw new NotFoundException('POST NO ENCONTRADO')
      }
    }

  }

  //error al no poder vincular un file 
  private handlerFileRecordsError({error,fileDtoExpected}: {error:any, fileDtoExpected:number}){
    if(error.meta?.cause.split(",")[0] ===  `Expected ${fileDtoExpected} records to be connected`){
      throw new ConflictException('files no encontrados')
    }
  }

    async createNewPostFile(req:any,file:Array<Express.Multer.File>,nameFiles: string){

      const sanitizedFiles = file.map(file => {
        const { buffer, ...fileData } = file;
        return fileData;
      });

      try {
        await this.prisma.filesPost.createMany({
          data: file.map(file => ({
            groupName: nameFiles,
            filename:file.filename,
            patch:file.path,
            size:file.size,
          }))
         
        })
      } catch (error) {
        
      }
      const secureUrl = `${ file.map(file =>  `${req.protocol}://[${req.ip}]:${req.socket.localPort}${req.url}/${file.filename}`) }`
      return secureUrl
    }

  getStaticFileImage( imageName:string){
    const path = join(__dirname, '../../static/uploads/filePost', imageName)
    if( !existsSync(path)){
      throw new BadRequestException('no imagen encontrada')
    }

    return path
  }

  async getStaticFileImage_ID(id:string){

    function esNumero(cadena:any) {
      return !isNaN(cadena);
    }

    let fileseach: {
      id: number;
      groupName: string;
      filename: string;
      patch: string;
      size: number;
      createdAt: Date;
      updatedAt: Date;
  }

    if(esNumero(id) ){ //  verificar si es un numero
      console.log("es un numero")

      fileseach = await this.prisma.filesPost.findUnique({
        where:{
          id:+id
        }
      })

    }else{
      console.log("no es un numero")
      fileseach = await this.prisma.filesPost.findFirst({
        where:{
          filename:id
        }
      })
    }


    if(!fileseach){
      throw new BadRequestException('no imagen encontrada')
    }

    const path = join(__dirname, '../../static/uploads/filePost', fileseach.filename)

    return path

  }

  async removeFilePost(id:number){
    console.log(id)
    const file = await this.prisma.filesPost.findUnique({
      where: {
        id: id,
      },
    })

    if(!file){
     throw new NotFoundException("no se encontro el archivo: " + id)
    }

    const filePath =  `./static/uploads/filePost/${file.filename}`

    const deleteFile = await this.prisma.filesPost.delete({
      where:{
        id: id
      }
    })

    
     const deletedFile= await this.fileService.deleteFile(filePath)

    

    return {
      response:`archivo N° ${id} eliminado con exito`,
    }
  }

  //
}
