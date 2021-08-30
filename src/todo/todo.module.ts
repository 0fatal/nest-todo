import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { AuthModule } from '../auth/auth.module'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'
import { Todo } from './entity/todo.entity'
import { Task } from './entity/task.entity'
import { User } from '../user/entity/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodoRepository } from './repository/todo.repository'
import { UserRepository } from '../user/repository/UserRepository'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, TodoRepository]),
    UserModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
