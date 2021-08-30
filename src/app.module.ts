import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import loadConfig from './config/configurations'
import { AuthModule } from './auth/auth.module'
import { TodoModule } from './todo/todo.module'
import { CountController } from './count/count.controller'
import { CountModule } from './count/count.module'
import { StaticModule } from './static/static.module'
import { QuoteModule } from './quote/quote.module'
import { UploadModule } from './upload/upload.module'

const businessModules = [
  AuthModule,
  UserModule,
  TodoModule,
  CountModule,
  StaticModule,
  QuoteModule,
  UploadModule,
]

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
  providers: [AppService],
})
export class AppModule {}
