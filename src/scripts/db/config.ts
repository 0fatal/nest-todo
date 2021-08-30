import { ConnectionOptions } from 'typeorm'
import { Todo } from '../../todo/entity/todo.entity'
import { User } from '../../user/entity/user.entity'
import { Task } from '../../todo/entity/task.entity'

const ormConfig: ConnectionOptions = {
  type: 'mysql',
  database: 'mytodo',
  host: 'mysql',
  port: 3306,
  username: 'root',
  password: '123456',
  entities: [User, Todo, Task],
}

export default ormConfig
