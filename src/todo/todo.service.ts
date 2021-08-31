import { TodoRepository } from './repository/todo.repository'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { Todo } from './entity/todo.entity'
import { TodoDTO } from './dto/todo.dto'
import { CreateTodoDTO } from './dto/todo.create.dto'
import { UserDTO } from '../user/dto/user.dto'
import { toTodoDTO } from '../shared/mapper'

@Injectable()
export class TodoService {
  constructor(
    private todoRepository: TodoRepository,
    private userService: UserService
  ) {}

  async getAllTodo(): Promise<TodoDTO[]> {
    const todos = await this.todoRepository.find({
      relations: ['tasks', 'owner'],
    })

    return todos.map(todo => toTodoDTO(todo))
  }

  async getOneTodo(id: string): Promise<TodoDTO> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['tasks', 'owner'],
    })

    if (!todo) {
      throw new HttpException(`Todo list doesn't exist`, HttpStatus.BAD_REQUEST)
    }

    return toTodoDTO(todo)
  }

  async createTodo(
    { username }: UserDTO,
    createTodo: CreateTodoDTO
  ): Promise<TodoDTO> {
    const owner = await this.userService.findOneByOption({
      where: {
        username,
      },
    })

    console.log(owner)

    const todo: Todo = this.todoRepository.create({
      ...createTodo,
      owner: owner,
    })

    await this.todoRepository.save(todo)
    return toTodoDTO(todo)
  }

  async deleteTodo(id: string): Promise<TodoDTO> {
    const todo: Todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['tasks', 'owner'],
    })

    if (!todo) {
      throw new HttpException(`Todo list doesn't exist`, HttpStatus.BAD_REQUEST)
    }

    if (todo.tasks && todo.tasks.length > 0) {
      throw new HttpException(
        `Cannot delete this Todo list, it has existing tasks`,
        HttpStatus.FORBIDDEN
      )
    }

    await this.todoRepository.delete({ id })
    return toTodoDTO(todo)
  }
}
