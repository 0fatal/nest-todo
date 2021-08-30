import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common'
import { TodoListDTO } from './dto/todo.list.dto'
import { TodoService } from './todo.service'
import { toTodoDTO } from '../shared/mapper'
import { TodoDTO } from './dto/todo.dto'
import { CreateTodoDTO } from './dto/todo.create.dto'
import { UserDTO } from '../user/dto/user.dto'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(@Req() req: any): Promise<TodoListDTO> {
    const todos = await this.todoService.getAllTodo()
    return { todos }
  }

  @Get(':id')
  async findOne(@Param() id: string): Promise<TodoDTO> {
    const todo = await this.todoService.getOneTodo(id)
    return todo
  }

  @Post()
  async create(
    @Body() createTodoDTO: CreateTodoDTO,
    @Req() req
  ): Promise<TodoDTO> {
    const todo = await this.todoService.createTodo(
      req.user as UserDTO,
      createTodoDTO
    )
    return todo
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<TodoDTO> {
    return this.todoService.deleteTodo(id)
  }
}
