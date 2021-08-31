import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { UserService } from '../../user/user.service'
import { jwtConstants } from '../constants'

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'ws-jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: req => {
        const { authorization } = req.handshake.headers
        if (!authorization) {
          return null
        }

        const [, token] = authorization.split(' ')
        return token
      },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any) {
    const existUser = this.userService.findOne(payload.sub)
    if (!existUser) {
      return
    }

    return { ...payload, id: payload.sub }
  }
}
