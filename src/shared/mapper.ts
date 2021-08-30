import { Todo } from '../todo/entity/todo.entity'
import { TodoDTO } from '../todo/dto/todo.dto'
import { User } from '../user/entity/user.entity'
import { UserDTO } from '../user/dto/user.dto'
import { TaskDTO } from 'src/todo/dto/task.dto'
import { Task } from '../todo/entity/task.entity'

export const toTodoDTO = (data: Todo) => {
  const { id, name, description, status, createAt, updateAt, owner, tasks } =
    data
  let todoDTO: TodoDTO = {
    id,
    name,
    description,
    status,
    createAt,
    updateAt,
    owner: owner ? toUserDTO(owner) : null,
  }

  if (tasks) {
    todoDTO = {
      ...todoDTO,
      tasks: tasks.map((task: Task) => toTaskDTO(task)),
    }
  }

  return todoDTO
}

export const toUserDTO = (data: User): UserDTO => {
  const { nickname, email } = data
  const userDTO: UserDTO = {
    email,
    nickname,
  }
  return userDTO
}

export const toTaskDTO = (data: Task): TaskDTO => {
  const { id, name, createAt } = data
  const taskDTO: TaskDTO = {
    id,
    name,
    createAt,
  }
  return taskDTO
}
