import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/prisma.service';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService,PrismaService],
  imports:[
    PostModule
  ]
})
export class ImagesModule {}
