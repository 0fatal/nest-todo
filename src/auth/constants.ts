import { SetMetadata } from '@nestjs/common'

export const jwtConstants = {
  secret: 'secretKey',
  expiresIn: 100,
}

export const IS_PUBLIC_KEY = 'isPublic'
export const SkipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true)
