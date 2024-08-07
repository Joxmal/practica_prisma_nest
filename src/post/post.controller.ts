import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, BadRequestException, Version, Res, Req, ParseIntPipe, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateFilePostDto } from './dto/filePost/create-filePost.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/common/enums/helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/common/enums/helpers/fileNamer.helper';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Categoria } from '@prisma/client';
import { FindAllPost } from './dto/controller/findAllPost.dto';

// @UseGuards(JwtAuthGuard,RolesGuard)
@ApiBearerAuth()
@ApiTags("Modulo POST")
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly configService: ConfigService,
  ) {}
  
  @Auth(Role.ADMIN)
  @Post()
  create(
    @Req() req: any,
    @Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto,req);
  }
  
  @Get()
  findAll(
    @Query() queryFindAllPost:FindAllPost,
    @Req() req: any,
  ) {
    return this.postService.findAll(req,queryFindAllPost);
  }

  @Get(':id')
  findOne(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne({id:id, req});
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto){
    return this.postService.update(+id, updatePostDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  //crear unicamente files nuevos

  @Auth(Role.ADMIN)
  @Post('files')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('file',10, {
    fileFilter: fileFilter,
    limits:{fileSize:1*1024*1024},
    storage:diskStorage({
      destination:'./static/uploads/filePost',
      filename: fileNamer
    })
  }))
  createNewPostFile(
    @Req() req: any,
    @Body() data:CreateFilePostDto,
    @UploadedFiles() file:Array<Express.Multer.File>,
  ){      
    if(!file){
      throw new BadRequestException('no envio archivos, debe ser una imagen')
    }
    return this.postService.createNewPostFile(req,file,data.name)
  }

  @Get('filesAll/all')
  async finAllFileImage_id(
  @Req() req: Request,
  ){
    console.log('aqui callo')
    const path = await this.postService.getAllStaticFileImage_ID(req)
    return path
  }

  @Get('files/:id')
  async finOneFileImage_id(
  @Res() res: Response,
  @Param('id') id: string
  ){
    console.log('aqui callo')
    const path = await this.postService.getStaticFileImage_ID(id)
    res.sendFile(path)
  }


  @Auth(Role.ADMIN)
  @Delete('files/:id')
  async removeFile(
    @Param('id', ParseIntPipe) id:number
  ){
  
    return await this.postService.removeFilePost(id)
  }
}
