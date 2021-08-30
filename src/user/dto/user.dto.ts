import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserDTO {
  id?: string

  username?: string

  nickname?: string

  email?: string

  createdAt?: Date

  updateAt?: Date
}
