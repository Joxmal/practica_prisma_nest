import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {

  constructor(private prisma:PrismaService){}


  async create(createPostDto: CreatePostDto) {

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
        data: createPostDto,
        include:{
          author: {
            select: {
              id: true,
              name: true,
              createdAt: true
            },
          },
          files: true
        }
      })
    } catch (error) {
      if(error.meta.field_name === "posts_authorID_fkey (index)")
        throw new ConflictException('EL AUTOR NO EXISTE')
      console.log(error)
    }

  }

  findAll() {
    return this.prisma.post.findMany({orderBy:{id:'asc'}}) ;
  }

  async findOne(id: number) {
     const post = await this.prisma.post.findUnique({
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

    try {


    //  const updatePost = await this.prisma.post.update({
    //    where: {id:existinPost.id},
    //    data: updatePostDto,
    //  });
    //  return updatePost
      
    } catch (error) {
      console.log(error)
      if(error.code === 'P2002' && error.meta.modelName === 'Post'){
        throw new ConflictException(`Ya existe un post con el título ${updatePostDto.title}`)
      }
    }
  }

  async remove(id: number) {

    try {
      await this.prisma.post.delete({
        where: {
          id: id,
        },
      })
    } catch (error) {
      console.log(error)
      if(error.code === 'P2025'){
        throw new NotFoundException('POST NO ENCONTRADO')
      }
    }

  }
}
