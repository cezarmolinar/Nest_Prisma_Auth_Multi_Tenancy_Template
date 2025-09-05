import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRoles } from 'src/users/user-roles'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>('roles', [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return true
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = context.switchToHttp().getRequest()

    //console.log('USER ROLES:', user.roles)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return requiredRoles.some((role) => user.roles?.includes(role))
  }
}
