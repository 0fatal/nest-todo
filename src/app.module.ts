import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import loadConfig from './config/configurations'
import { AuthModule } from './auth/auth.module'
import { TodoModule } from './todo/todo.module'
import { CountService } from './count/count.service'
import { CountController } from './count/count.controller'
import { CountModule } from './count/count.module'

const businessModules = [AuthModule, UserModule, TodoModule, CountModule]

const libModules = [
  ConfigModule.forRoot({
    load: [loadConfig],
    envFilePath: '.env',
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { host, port, username, password, database } =
        configService.get('db')

      return {
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: ['dist/**/*.entity{.ts,.js}'],
      }
    },
  }),
]

@Module({
  imports: [...libModules, ...businessModules],
  controllers: [AppController, CountController],
  providers: [AppService, CountService],
})
export class AppModule {}
