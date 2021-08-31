import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { MessageData } from './chat.interface'
import { Cron, CronExpression } from '@nestjs/schedule'

@WebSocketGateway({
  path: '/chat/socket.io',
  cors: {
    origin: 'http://localhost:8080',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('clientToServer')
  async clientToServer(
    @MessageBody() clientData: MessageData
  ): Promise<MessageData> {
    return {
      content: 'hahlo',
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async sayHi() {
    this.server.emit('serverToClient', { content: 'enne' })
  }
}
