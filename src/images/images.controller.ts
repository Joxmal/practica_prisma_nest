import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { UpdateCarruselImageDto } from './dto/carrusel/carrusel-update-image.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags("Modulo imagenes")
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}



  // carrusel

  @Get('carrusel')
  getImagesCarrusel() {
    return this.imagesService.getAllImagesCarrusel();
  }

  @ApiBearerAuth()
  // @Auth(Role.ADMIN)
  @Patch('carrusel')
  patchImagesCarrusel(@Body() updateCarruselImageDto: UpdateCarruselImageDto) {
    return this.imagesService.updateImagesCarrusel(updateCarruselImageDto);
  }

  // imagenes a futuro

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }


}
