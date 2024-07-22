import { PartialType } from '@nestjs/swagger';
import { CreateCooperadorDto } from './create-cooperador.dto';

export class UpdateCooperadorDto extends PartialType(CreateCooperadorDto) {}
