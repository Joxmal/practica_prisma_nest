import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class SeedService {

  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) { }

  async seedAdmin(key: string) {

    if (key !== process.env.SECRET_KEY) throw new ForbiddenException("no autorizado")

    const existAdmin = await this.prisma.user.findFirst({
      where: {
        name: "admin",
      }
    })

    if (existAdmin) return "Administrador ya existe"

    await this.usersService.create({
      name: "admin",
      password: "admin123",
      role: Role.SUPERADMIN,
    })

    return {
      name: "admin",
      password: "admin123"
    }
  }

  async data_DB(key: string) {
    if (key !== process.env.SECRET_KEY) throw new ForbiddenException("no autorizado")

    const message = {
      categorias: 'X',
      cooperador: 'X',
      post: 'X',
      postFiles: 'X'
    }

    //debug para borrar todo antes
    await this.prisma.categoria.deleteMany()
    await this.prisma.cooperador.deleteMany()


    message.categorias = await this.crearCaterogias()

    message.cooperador = await this.crearCooperador()

    return message

  }

  private async crearCaterogias() {
    try {
      const categorias: string[] = process.env.CATEGORIAS.split(',');

      const categoriasData = categorias.map((categoria) => ({
        name: categoria
      }));

      await this.prisma.categoria.createMany({
        data: categoriasData
      })

      return 'categorias creadas con exito'
    } catch (error) {
      console.log(error)
      if (error.code === 'P2002' && error?.meta.target[0] === 'name') {
        return 'categorias ya estaba creada'
      }
      throw new ConflictException('Error Interno')
    }
  }

  private async crearCooperador() {
    try {


      const patrocinador: any = 'patrocinador'
      const colaborador: any = 'colaborador'
      const cooperadorDataSeed = [
        { tipoCedula: "J", cedula: 25542356, nombre: "sancho Panza Montes", ubicacion: "mariño casco central", tipo: colaborador, categorias: { connect: { name: 'idiomático' } } },
        { tipoCedula: "V", cedula: 12345678, nombre: "María Rodríguez", ubicacion: "Caracas", tipo: patrocinador, categorias: { connect: { name: 'ecoturismo' } } },
        { tipoCedula: "J", cedula: 98765432, nombre: "Juan Pérez", ubicacion: "Valencia", tipo: colaborador, categorias: { connect: { name: 'deportivo' } } },
        { tipoCedula: "V", cedula: 87654321, nombre: "Ana Gómez", ubicacion: "Maracaibo", tipo: patrocinador, categorias: { connect: { name: 'parques temáticos' } } },
        { tipoCedula: "V", cedula: 28045702, nombre: "Jose Montes", ubicacion: "mariño casco central", tipo: patrocinador, categorias: { connect: { name: 'gastronómico' } } }
      ]
      const array_promises = []
      cooperadorDataSeed.forEach((cooperador) =>{
        
        array_promises.push(this.prisma.cooperador.create({data: cooperador }))
      })

      await Promise.all(array_promises)

      return 'cooperador creado con exito'
    } catch (error) {
      console.log(error)
    }

  }




}
