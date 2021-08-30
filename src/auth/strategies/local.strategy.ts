import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '../../user/entity/user.entity'
import { ContextIdFactory, ModuleRef } from '@nestjs/core'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({ passReqToCallback: true })
  }

  async validate(
    request: Request,
    username: string,
    password: string
  ): Promise<Omit<User, 'password'>> {
    const contextId = ContextIdFactory.getByRequest(request)
    const authService = await this.moduleRef.resolve(AuthService, contextId)
    // 现在 authService 是一个 request-scoped provider
    console.log(username, password)
    const user = await authService.validateUser(username, password)

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
