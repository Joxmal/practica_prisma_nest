import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!role) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest()

    console.log(role)
    console.log("user", user)

    if (!user) {
      throw new Error('No se ha iniciado sesión')
    }

    if(role === user.role){
      return true;
    }else{
      throw new ForbiddenException('No tiene los permisos necesarios')
    }
  }
}
