import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriasService {

  constructor(
    private prisma:PrismaService,
  ){}

  async create(createCategoriaDto: CreateCategoriaDto) {
    
      
      const findCategoria = await this.prisma.categoria.findUnique({
        where:{
          name: createCategoriaDto.name
        }
      })
      
      if(findCategoria) throw new ConflictException('ya existe esa categoria')
      
        const createdCategoria = await this.prisma.categoria.create({
          data:{
            name:createCategoriaDto.name,
          }
        })
      
      return createdCategoria;

  }

  findAll(){
    return this.prisma.categoria.findMany()
  }

  async findOne(id: number) {
    const findCategoria = await this.prisma.categoria.findUnique({
      where:{
        id
      }
    })

    if(!findCategoria) throw new NotFoundException('no se encontro la categoria')

    return findCategoria
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  async remove(id: number) {
    const categoria = await this.findOne(id)

    await this.prisma.categoria.delete({
      where:{
        id: categoria.id
      }
    })
    return `Se elimino la categoria ${ categoria.name}`
  }
}
