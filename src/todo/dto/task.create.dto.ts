import { IsNotEmpty } from 'class-validator'

export class CreateTaskDTO {
  @IsNotEmpty()
  name: string
}
