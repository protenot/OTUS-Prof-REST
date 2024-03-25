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

  @Column({ type: "uuid" })
  userId: string = "";

  @Column({ type: "uuid" })
  taskId: string = "";

  @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
  data: Date;

  @Column("text")
  commentText: string = "";

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;
  @ManyToOne(() => Task, (task) => task.comments)
  task!: Task;
}
