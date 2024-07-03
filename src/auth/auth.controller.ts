import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Modulo LOGIN")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post()
  loginUser(@Body() user:LoginAuthDto) {
    return this.authService.loginUser(user);
  }
}
