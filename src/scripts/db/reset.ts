import ormConfig from './config'
import { createConnection } from 'typeorm'
import { Todo } from '../../todo/entity/todo.entity'
import { User } from '../../user/entity/user.entity'

const reset = async () => {
  const connection = await createConnection(ormConfig)
  await connection.createQueryBuilder().delete().from(Todo).execute()
  await connection.createQueryBuilder().delete().from(User).execute()
}

reset()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
