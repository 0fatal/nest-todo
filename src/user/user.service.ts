import { UserRepository } from './repository/UserRepository'
import { CreateUserDTO } from './dto/create-user.dto'
import { User } from './entity/user.entity'
import { UpdateUserDTO } from './dto/update-user.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserDTO } from './dto/user.dto'
import { LoginUserDTO } from './dto/user-login.dto'
import { comparePassword } from '../shared/utils'
import { toUserDTO } from '../shared/mapper'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDTO: CreateUserDTO) {
    const { username, password, email, nickname } = createUserDTO
    const userInDb = await this.userRepository.findOne({
      where: { username },
    })

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    const user = new User()
    user.username = username
    user.password = password
    user.email = email
    user.nickname = nickname
    return this.userRepository.save(user)
  }

  async findByLogin({ username, password }: LoginUserDTO): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { username } })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
    }
    const areEqual = await comparePassword(user.password, password)
    if (!areEqual) {
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED)
    }

    return toUserDTO(user)
  }

  async findAll() {
    return this.userRepository.find()
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id)
  }

  async findOneByOption(options?: Record<string, unknown>): Promise<UserDTO> {
    const user = await this.userRepository.findOne(options)
    return user
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    })
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    return this.userRepository.update({ id }, updateUserDTO)
  }

  async remove(id: string) {
    return this.userRepository.delete({ id })
  }

  async checkAdmin(id: string) {
    return this.userRepository.findOne({
      where: {
        id,
        isAdmin: 1,
      },
    })
  }
}
