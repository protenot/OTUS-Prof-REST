import { myDataSource } from "../config/db-config";
import { Task } from "../models/task.entity";

export const taskRepository = myDataSource.getRepository(Task);
