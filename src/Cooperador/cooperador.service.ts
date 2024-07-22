import { Injectable } from '@nestjs/common';
import { CreateCooperadorDto } from './dto/create-cooperador.dto';
import { UpdateCooperadorDto } from './dto/update-cooperador.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PatrocinadorService {

  constructor(
    private prisma:PrismaService
  ){}


  create(createPatrocinadorDto: CreateCooperadorDto) {
    return 'This action adds a new patrocinador';
  }

  findAll() {
    return `This action returns all patrocinador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patrocinador`;
  }

  update(id: number, updatePatrocinadorDto: UpdateCooperadorDto) {
    return `This action updates a #${id} patrocinador`;
  }

  remove(id: number) {
    return `This action removes a #${id} patrocinador`;
  }
}
