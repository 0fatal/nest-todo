import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class CreateTodoDTO {
  @IsNotEmpty()
  name: string

  @IsOptional()
  @MaxLength(500)
  description?: string
}
