import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatrocinadorService } from './cooperador.service';
import { CreateCooperadorDto } from './dto/create-cooperador.dto';
import { UpdateCooperadorDto } from './dto/update-cooperador.dto';

import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags("Modulo cooperadores")
@Auth(Role.ADMIN)
@Controller('cooperador')
export class CooperadorController {
  constructor(
    private readonly patrocinadorService: PatrocinadorService
  ){}

  @Post()
  create(@Body() createCooperadorDto: CreateCooperadorDto) {
    console.log('creando cooperador')
    return this.patrocinadorService.create(createCooperadorDto);
  }

  @Get()
  findAll() {
    return this.patrocinadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patrocinadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatrocinadorDto: UpdateCooperadorDto) {
    return this.patrocinadorService.update(+id, updatePatrocinadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patrocinadorService.remove(+id);
  }
}
