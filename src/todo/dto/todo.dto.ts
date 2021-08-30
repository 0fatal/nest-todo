import { UserDTO } from 'src/user/dto/user.dto'
import { TaskDTO } from './task.dto'
import { IsNotEmpty } from 'class-validator'
import { TodoStatus } from '../entity/todo.entity'

export class TodoDTO {
  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  name: string

  status?: TodoStatus
  description?: string
  createAt?: Date
  updateAt?: Date
  owner: UserDTO
  tasks?: TaskDTO[]
}
