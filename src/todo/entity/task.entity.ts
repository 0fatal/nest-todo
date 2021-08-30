import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Todo } from './todo.entity'

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @CreateDateColumn()
  createAt: Date

  @ManyToOne(() => Todo, todo => todo.tasks)
  todo: Todo
}
