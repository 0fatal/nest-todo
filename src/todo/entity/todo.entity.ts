import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../../user/entity/user.entity'
import { Task } from './task.entity'

export enum TodoStatus {
  TODO = 0,
  DONE = 1,
}

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'text' })
  description?: string

  @Column('int', { default: TodoStatus.TODO })
  status?: TodoStatus

  @Column()
  ownerId: string

  @ManyToOne(() => User, user => user.todos)
  @JoinColumn({
    name: 'ownerId',
    referencedColumnName: 'id',
  })
  owner: User

  @OneToMany(() => Task, task => task.todo)
  tasks: Task[]

  @CreateDateColumn()
  createAt: Date

  @CreateDateColumn()
  updateAt: Date

  @BeforeInsert()
  private async timestampFill() {
    this.createAt = new Date()
    this.updateAt = new Date()
  }

  @BeforeUpdate()
  private async timestampUpdateFill() {
    this.updateAt = new Date()
  }
}
