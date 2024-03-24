import { myDataSource } from "../config/dataSource";
import { Task } from "../models/task.entity";

export const taskRepository = myDataSource.getRepository(Task);
