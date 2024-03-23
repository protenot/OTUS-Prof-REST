/* const EntitySchemaUser = require("typeorm").EntitySchema;

module.exports = new EntitySchemaUser({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "character varying",
      length: 1000,
    },

    name: {
      type: "character varying",
      length: 100,
    },
    email: {
      type: "text",
    },

    role: {
      type: "character varying",
      length: 100,
    },
    password: {
      type: "character varying",
      length: 1000,
    },
  },
  relations: {
    anotherEntity: {
      target: "Comment",
      type: "one-to-one",
      joinColumn: { name: "id" },
      onDelete: "CASCADE",
    },
  },
});
 */

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import {Comment} from "./comment.entity";
import {v4} from "uuid"
@Entity("users")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string=v4();

    @Column({
      length:100
    })
    name: string='';

    @Column("text")
    email: string="";

    @Column({
      length:100
    })
    role: string="";

    @Column({
      length:1000
    })
    password: string="";

    @OneToMany(()=> Comment, comment=>comment.user)
    comments!:Comment[]

}
