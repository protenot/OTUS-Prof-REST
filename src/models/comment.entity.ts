/* export const EntitySchemaComment = require("typeorm").EntitySchema;

module.exports = new EntitySchemaComment({
  name: "Comment",
  tableName: "comments",
  columns: {
    id: {
      primary: true,
      type: "character varying",
      length: 100,
    },
    idUser: {
      type: "character varying",
      length: 100,
    },
    idTask: {
      type: "character varying",
      length: 100,
    },
    commentText: {
      type: "text",
    },
  },
}); */

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import {User} from "./user.entity";
import {Task} from "./task.entity";
import {  v4 } from "uuid";

@Entity("comments")
export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string=v4();

    @Column({
      length:100
    })
    idUser: string="";

    @Column({
      length:100
    })
    idTask: string="";

    @Column(
    "text"
    )
    commentText: string="";

@ManyToOne(()=>User, user =>user.comments)
user!:User
@ManyToOne(()=>Task, task =>task.comments)
task!:Task


}
