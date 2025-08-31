import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/user.entity'; // Adjust the import based on your User entity location
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum'; // Adjust the import based on your Role enum location

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Assuming user is attached to the request object
    return user && requiredRoles.some(role => user.roles?.includes(role));
  }
}