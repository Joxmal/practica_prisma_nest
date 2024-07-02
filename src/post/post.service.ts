import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {

  constructor(private prisma:PrismaService){}


  async create(createPostDto: CreatePostDto) {

    const filesPost = createPostDto.filesPost.map(file => {
      return {
        id: file
      }
    })
    delete createPostDto.filesPost

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

    const filesPostExist = existinPost.files.map(file => {
      return {
        id: file.id
      }
    })

    const filesPostUpdate = updatePostDto.filesPost.map(file => {
      return {
        id: file
      }
    })

    console.log(filesPostExist)
    console.log(filesPostUpdate)

    try {

      delete updatePostDto.filesPost

    const updatePost = await this.prisma.post.update({
      where: {id:existinPost.id},
      data: {
        ...updatePostDto,
        files:{
          disconnect: filesPostExist,
          connect: filesPostUpdate,
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
}
