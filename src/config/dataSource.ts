import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user.entity";
import { Task } from "../models/task.entity";
import { Comment } from "../models/comment.entity";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Pr0ten0t",
  database: "otusdb",
  entities: [User, Task, Comment],
  synchronize: true,
  logging: false,
  migrations: ['./migrations/*.ts'],
  migrationsTableName: 'migrations',
});

myDataSource.initialize();
