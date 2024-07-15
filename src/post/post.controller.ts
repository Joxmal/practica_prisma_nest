import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, UseInterceptors, BadRequestException, Version, UploadedFile, Res,HttpServer, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateFilePostDto } from './dto/filePost/create-filePost.dto';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/common/enums/helpers/fileFilter.helper';
import { FileSizeGuard } from 'src/common/guard/fileSize.guard';
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
  @Version('1')
  @Post('files')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('file',10, {
    fileFilter: fileFilter,
    limits:{fileSize:100000},
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
    
    const sanitizedFiles = file.map(file => {
      const { buffer, ...fileData } = file;
      return fileData;
    });
  
    
    const dataReturn ={
      name : data.name,
      file:sanitizedFiles
    }


    if(!file){
      throw new BadRequestException('no envio archivos, debe ser una imagen')
    }

    const secureUrl = `${ file.map(file =>  `${req.protocol}://[${req.ip}]:${req.socket.localPort}${req.url}/${file.filename}`) }`
    console.log(req.socket.localPort)

  
    return secureUrl
  }


  @Get('files/:imageName')
  finOneFileImage(
  @Res() res: Response,
  @Param('imageName') imageName: string
  ){
    const path = this.postService.getStaticFileImage(imageName)

    res.sendFile(path)
  }


}
