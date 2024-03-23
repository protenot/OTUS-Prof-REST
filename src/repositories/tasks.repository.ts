import { Repository } from "typeorm";
import { myDataSource2Pg } from "../routes/routes";
import { Task } from "../models/task.model";

export const taskRepository = (): Repository<Task> => {
  return myDataSource2Pg.getRepository("Task");
};