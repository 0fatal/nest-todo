import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from 'src/roles/roles.decorator'
import { Role } from '../../roles/roles.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    const adminUser = await this.userService.checkAdmin(user.id)

    return !!adminUser
  }
}
