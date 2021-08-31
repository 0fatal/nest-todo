import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { ChatGateway } from './chat.gateway'
import { WsJwtStrategy } from '../auth/strategies/ws-jwt.strategy'

@Module({
  imports: [UserModule],
  providers: [ChatGateway, WsJwtStrategy],
})
export class ChatModule {}
