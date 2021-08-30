import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Todo } from '../../todo/entity/todo.entity'
import * as bcrypt from 'bcrypt'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  nickname: string

  @CreateDateColumn()
  createAt?: Date

  @UpdateDateColumn()
  updateAt?: Date

  @Column()
  email: string

  @Column()
  isAdmin: number

  @OneToMany(() => Todo, todo => todo.owner)
  todos?: Todo[]

  @BeforeInsert()
  private async timestampCreated() {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    this.createAt = new Date()
    this.updateAt = new Date()
  }

  @BeforeUpdate()
  private async timestampUpdated() {
    this.updateAt = new Date()
  }
}
