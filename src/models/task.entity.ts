import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Comment } from "./comment.entity";
import { v4 } from "uuid";

@Entity("tasks")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string = v4();

  @Column("text")
  description: string = "";

  @Column("text")
  solution: string = "";

  @Column()
  complexity: number = 0;

  @Column("varchar", { length: 100 })
  language: string = "";

  @Column("varchar", { length: 1000 })
  tag: string = "";

  @OneToMany(() => Comment, (comment) => comment.task)
  comments!: Comment[];
}
