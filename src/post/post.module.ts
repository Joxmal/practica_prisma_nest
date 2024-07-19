import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service'; 
import { AuthModule } from 'src/auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { FileService } from 'src/common/files/filesServices';

@Module({
  controllers: [PostController],
  providers: [PostService,
     PrismaService, ConfigService, FileService],
  imports:[]
})
export class PostModule {}
