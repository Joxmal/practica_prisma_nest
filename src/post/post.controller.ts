import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, BadRequestException, Version, Res, Req, ParseIntPipe } from '@nestjs/common';
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
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

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
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }
  
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  //crear unicamente files nuevos
  // @Auth(Role.ADMIN)

  @Auth(Role.ADMIN)
  @Post('files')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('file',10, {
    fileFilter: fileFilter,
    limits:{fileSize:1500000},
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


  @Get('files/:imageName')
  finOneFileImage(
  @Res() res: Response,
  @Param('imageName') imageName: string
  ){
    const path = this.postService.getStaticFileImage(imageName)

    res.sendFile(path)
  }

  @Delete('files/:id')
  removeFilePost(
    @Param('id', ParseIntPipe) id:number
  ){
    return this.postService.removeFilePost(id)
  }


}
