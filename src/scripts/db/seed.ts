import { UserRepository } from '../../user/repository/UserRepository'
import ormConfig from './config'
import { createConnection } from 'typeorm'
import { User } from '../../user/entity/user.entity'
import { getInitUsers, getRandomTodo, getRandomUser } from './random'
import * as lodash from 'lodash'

const checkExist = async (userRepository: UserRepository) => {
  console.log('检查是否已经初始化')

  const userNum = await userRepository.count()
  if (userNum > 0) {
    console.log(`已存在 ${userNum}用户数据，不再初始化`)
    return true
  }
  return false
}

const seed = async () => {
  console.log('开始插入数据')
  const connection = await createConnection(ormConfig)

  const userRepository = connection.getRepository<User>(User)

  const dataExist = await checkExist(userRepository)

  if (dataExist) {
    return
  }
  const initUsers = getInitUsers()
  console.log('生成初始化数据....')

  initUsers.forEach(user => {
    user.todos = lodash.range(3).map(() => {
      const randomTodo = getRandomTodo()
      randomTodo.owner = user
      return randomTodo
    })
  })

  // const users = lodash.range(10).map(() => {
  //   const todos = lodash.range(3).map(() => {
  //     const randomTodo = getRandomTodo()
  //     randomTodo.owner = user
  //     return randomTodo
  //   })
  //   return getRandomUser(todos)
  // })

  const allUser = [...initUsers]
  await userRepository.save(allUser)
  console.log('数据初始化成功')
}

seed()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
