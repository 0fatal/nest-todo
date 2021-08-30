import { CreateUserDTO } from './create-user.dto'
import { OmitType, PartialType } from '@nestjs/mapped-types'

export class UpdateUserDTO extends PartialType(
  OmitType(CreateUserDTO, ['username'] as const)
) {}
