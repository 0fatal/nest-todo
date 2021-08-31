import { AuthGuard } from '@nestjs/passport'
import { WsException } from '@nestjs/websockets'

export class WsJwtAuthGuard extends AuthGuard('ws-jwt') {
  handleRequest(err, user) {
    if (err || !user) {
      throw err || new WsException('未登录')
    }
    return user
  }
}
