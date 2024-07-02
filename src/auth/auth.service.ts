import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const userExist = await  this.prisma.user.findFirst({
       where: { 
        name: user.name, 
      } 
      });

    console.log(user)


    const payload = {
      sub: userExist.id,
      username: userExist.name,
    }


    
    if(!userExist || userExist.password!== user.password){
      throw new ForbiddenException()
    }


    return {
      access_token: await this.jwtService.signAsync(payload)
    }

  }
}
