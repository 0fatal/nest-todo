import { IsAlphanumeric, IsEmail, IsString, MaxLength } from 'class-validator'

export class CreateUserDTO {
  @IsAlphanumeric()
  @MaxLength(20)
  username: string

  @IsString()
  password: string

  @IsEmail()
  email: string

  @IsAlphanumeric()
  @MaxLength(20)
  nickname: string
}
