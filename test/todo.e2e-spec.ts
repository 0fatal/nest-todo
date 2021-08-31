import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from '../src/todo/entity/todo.entity'
import { User } from '../src/user/entity/user.entity'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TodoModule } from '../src/todo/todo.module'
import { AuthModule } from '../src/auth/auth.module'
import { TodoRepository } from '../src/todo/repository/todo.repository'
import { UserRepository } from '../src/user/repository/UserRepository'
import * as request from 'supertest'
import { Task } from '../src/todo/entity/task.entity'
import { CreateTodoDTO } from '../src/todo/dto/todo.create.dto'

describe('TodoController', () => {
  const typeOrmModule = TypeOrmModule.forRoot({
    type: 'mysql',
    database: 'mytodo',
    username: 'root',
    password: '123456',
    entities: [User, Todo, Task],
  })

  let app: INestApplication
  let bearerToken: string
  let createTodo: Todo

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoModule, AuthModule, typeOrmModule],
      providers: [TodoRepository, UserRepository],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin2', password: '123456' })
      .expect(201)
      .expect(res => {
        console.log(res.body)
        bearerToken = `bearer ${res.body.token}`
      })
  })

  it('GET /todo', done => {
    request(app.getHttpServer())
      .get('/todo')
      .set('Authorization', bearerToken)
      .expect(200)
      .expect(res => {
        console.log(res.body)
        expect(typeof res.body).toEqual('object')
        expect(res.body.todos instanceof Array).toBeTruthy()
        expect(res.body.todos.length >= 3).toBeTruthy()
      })
      .end(done)
  })

  it('POST /todo', done => {
    const newTodo: CreateTodoDTO = {
      name: '测试',
      description: '啥也不知道111111111111',
    }
    request(app.getHttpServer())
      .post('/todo')
      .set('Authorization', bearerToken)
      .send(newTodo)
      .expect(201)
      .expect(res => {
        console.log(res.body)
      })
      .end(done)
  })

  afterAll(async () => {
    await app.close()
  })
})
