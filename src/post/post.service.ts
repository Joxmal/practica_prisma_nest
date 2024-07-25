import { join } from 'path';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateFilePostDto } from './dto/filePost/create-filePost.dto';
import { existsSync } from 'fs';
import { FileService } from 'src/common/files/files.service';
import { consult_get_post } from './prisma/Consults';
import { Request } from 'express';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FindAllPost } from './dto/controller/findAllPost.dto';


@Injectable()
export class PostService {

  constructor(
    private prisma:PrismaService,
    private readonly fileService: FileService
  ){}


  async create(createPostDto: CreatePostDto, req:any ) {

    let filesPost: {id: number}[]
   
    if(createPostDto?.filesPost){
      filesPost = createPostDto.filesPost.map(file => {
        return {
          id: file
        }
      })
    }

    let cooperadorDto: {id: number}[]
    if(createPostDto?.cooperador){
      cooperadorDto = createPostDto.cooperador.map(id => {
        return {
          id: id
        }
      })
    }

    delete createPostDto.filesPost
    delete createPostDto.cooperador
    
    const existinPost = await this.prisma.post.findFirst({
      where: {
        title: createPostDto.title   
      },
    });

    if(existinPost){
      throw new ConflictException('POST YA EXISTE');
    }

    try {
     const result =  await this.prisma.post.create({
        data:{
          ...createPostDto,
          files:{
            connect:  filesPost
          },
          cooperador:{
            connect: cooperadorDto
          }
        },
        include:consult_get_post
      })

      const customResult =  [result].map(item=>{
        const modifiedFiles= item.files.map(file=>{
          file.secureUrl = `${req.protocol}://${req.get('host')}/api/post/files/${file.id}`
          return file
        })
        item.files= modifiedFiles
        return item
      })
      

      return customResult

    } catch (error) {
      console.log(error)
      if(error.meta.field_name === "posts_authorID_fkey (index)")
        throw new ConflictException('EL AUTOR NO EXISTE')

     
      
      this.handlerFileRecordsError({error,fileDtoExpected:filesPost.length})
      throw new Error('OCURRIO UN ERROR AL GUARDAR EL POST')

    }
  }

  async findAll(req:any, queryFindAllPost:FindAllPost) {
    
    const {limit=50, offset=0 , categoria = {}  } = queryFindAllPost
    
    const result = await this.prisma.post.findMany({
      where:{
        categoria:{
          some:{
            name: categoria
          }
        }
      }, 
      orderBy:{id:'asc'},
      include: consult_get_post,
      take:limit,
      skip:offset
    }) ;

    result.forEach(post =>{
      const imagenesConcat: string[] = []
      post.images.forEach(image=> imagenesConcat.push(image))// inyecto las imagenes externas
       
      post.files.forEach(file=>{
        imagenesConcat.push(file.secureUrl) // inyecto las imagenes de la base de datos interna

        const urlCuston =  `${req.protocol}://${req.get('host')}/api/post/files/${file.id}`
        file.secureUrl = urlCuston
     
      
      })
      post.images = imagenesConcat

    })
    return result
  }

  async findOne({id,req}: {id:number, req?:Request} ) {
     const post = await this.prisma.post.findUnique({
      include:consult_get_post,
      where: {
        id: id,
      },
    });

    if(!post){
      throw new NotFoundException('POST NO ENCONTRADO');
    }
    const customPost = post.files.map(file=>{
      // file.secureUrl = `${req.protocol}://[${req.ip}]:${req.socket.localPort}${file.secureUrl}`
      file.secureUrl = `${req.protocol}://${req.get('host')}/api/post/files/${file.id}`
      return file
    })
    post.files = customPost
    return post
  }


  async update(id: number, updatePostDto: UpdatePostDto) {
    const existinPost = await this.prisma.post.findUnique({
      include:consult_get_post,
      where: {
        id: id,
      },
    });

    if(!existinPost){
      throw new NotFoundException('POST NO ENCONTRADO');
    }

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
    if( updatePostDto?.cooperador){
      cooperadorUpdate = updatePostDto.cooperador.map(id => {
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
          set: filesPostUpdate,
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

    const secureUrl = `${ file.map(file =>  `${req.protocol}://${req.get('host')}/api/post/files/${file.filename}`)}`


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
          secureUrl: `${req.protocol}://${req.get('host')}/api/post/files/${file.filename}`
        }))
        
      })
    } catch (error) {
      
    }
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
