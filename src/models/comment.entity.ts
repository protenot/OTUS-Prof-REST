import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Task } from "./task.entity";
import { v4 } from "uuid";

@Entity("comments")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string = v4();

  @Column({
    length: 100,
  })
  idUser: string = "";

  @Column({
    length: 100,
  })
  idTask: string = "";

  @Column()
  data:number = 0;

  @Column("text")
  commentText: string = "";

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;
  @ManyToOne(() => Task, (task) => task.comments)
  task!: Task;
}
