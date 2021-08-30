import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { jwtConstants } from './constants'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { APP_GUARD } from '@nestjs/core'
import { AuthController } from './auth.controller'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: `${jwtConstants.expiresIn}m`,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
