import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  AfterLoad,
} from "typeorm";
import { Comment } from "./comment.entity";
import { v4 } from "uuid";
@Entity("users")
export class User extends BaseEntity {
 
  @PrimaryGeneratedColumn("uuid")
  id: string = v4();
  

  @Column({
    length: 100,
  })
  name: string = "";

  @Column("text")
  email: string = "";

  @Column({
    length: 100,
  })
  role: string = "";

  @Column({
    length: 1000,
  })
  password: string = "";

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  @AfterLoad()
  initialize() {
    if (!this.comments) {
      this.comments = [];
    }
  }
}
