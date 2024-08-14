import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';
import { PostService } from 'src/post/post.service';

  
export interface arrayURLCarrusel {
  id: number,
  secureUrl:string
}

@Injectable()
export class ImagesService {

  constructor(
    private prisma:PrismaService,
    private posService:PostService
  ){}

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  async getAllImagesCarrusel(){
    const findIDcarrusel = await this.prisma.imagesCarrusel.findMany({
      omit:{
        createdAt:true,
        updatedAt:true
      }
    })




    return  findIDcarrusel
    

  }

  updateImagesCarrusel(updateImageDto: UpdateImageDto){

  }
}
