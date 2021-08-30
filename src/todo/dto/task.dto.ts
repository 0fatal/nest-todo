import { IsNotEmpty, IsString } from 'class-validator'

export class TaskDTO {
  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  createAt: Date
}
