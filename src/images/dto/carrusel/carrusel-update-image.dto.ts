import { PartialType } from '@nestjs/swagger';
import { CarruselCreateImageDto } from './carrusel-create-image.dto';

export class UpdateCarruselImageDto extends PartialType(CarruselCreateImageDto) {}
