import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCooperadorDto } from './dto/create-cooperador.dto';
import { UpdateCooperadorDto } from './dto/update-cooperador.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PatrocinadorService {

  constructor(
    private prisma:PrismaService
  ){}


  async create(createPatrocinadorDto: CreateCooperadorDto) {

    const searchCooperador = await this.prisma.cooperador.findUnique({
      where: {
          cedula: createPatrocinadorDto.cedula,
          tipoCedula: createPatrocinadorDto.tipoCedula,
      },
    });

    console.log('searchCooperador',searchCooperador)
    
    if(searchCooperador) throw new ConflictException('Cooperador ya existe')

    console.log(typeof createPatrocinadorDto.tipoCedula)

    const { cedula,nombre,tipo,categoria,tipoCedula,ubicacion  } = createPatrocinadorDto

    const response = await this.prisma.cooperador.create({
      data:{
        tipoCedula,
        cedula,
        nombre,
        ubicacion,
        tipo,
        categorias:{
          connect: categoria?.map(id =>({ id }))
        },
      },
    })

    return response

  }

  findAll() {
    return this.prisma.cooperador.findMany()
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
