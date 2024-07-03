import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';



import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private prisma:PrismaService,
    private jwtService: JwtService
  ){}


  async loginUser(user: LoginAuthDto) {
    const userExist = await  this.prisma.user.findUnique({
       where: { 
        name: user.name, 
      } 
    });

    if (!userExist) throw new HttpException('este usuario no existe', HttpStatus.FORBIDDEN)

    const checkPassword = await compare(user.password, userExist.password)

    if(!checkPassword) throw new HttpException('contraseña incorrecta', 403)

    const payload = {
      id: userExist.id,
      name: userExist.name,
    }

    const token = this.jwtService.sign(payload)
    
    const data  = {
      user: userExist,
      token
  }

    return data
    

  }
}
