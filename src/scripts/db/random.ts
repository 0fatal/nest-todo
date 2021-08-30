import { User } from '../../user/entity/user.entity'
import { mock, Random } from 'mockjs'
import { Todo, TodoStatus } from '../../todo/entity/todo.entity'
import { Task } from '../../todo/entity/task.entity'

export const getInitUsers = () => {
  const admin = new User()
  admin.email = 'admin@example.com'
  admin.username = 'admin'
  admin.password = '123456'
  admin.isAdmin = 1

  const user = new User()
  user.email = 'user@example.com'
  user.username = 'user'
  user.password = 'user'
  user.isAdmin = 0

  return [admin, user]
}

export const getRandomUser = (todos?: Todo[]): User => {
  const user = new User()
  user.username = Random.cname()
  user.email = Random.email()
  user.password = '123456'
  user.isAdmin = Random.natural(0, 1)
  user.todos = todos || []
  return user
}

export const getRandomTodo = (tasks?: Task[]): Todo => {
  const todo = new Todo()
  todo.name = Random.cname()
  todo.description = Random.csentence()
  // todo.status = Random.natural(0, 1)
  todo.status = mock({
    'array|1': [TodoStatus.TODO, TodoStatus.DONE],
  }).array
  todo.tasks = tasks || []
  todo.owner = null

  return todo
}
