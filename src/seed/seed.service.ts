import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class SeedService {

  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ){}

  async seedAdmin(key:string){

    if(key !== process.env.SECRET_KEY)  throw new ForbiddenException("no autorizado")

    const existAdmin = await this.prisma.user.findFirst({
      where:{
        name: "admin",
      }
    })

    if(existAdmin) return "Administrador ya existe"

    const adminUser = await this.usersService.create({
      name: "admin",
      password: "admin123",
      role: "ADMINISTRADOR",
    })

    
     
  }
}
