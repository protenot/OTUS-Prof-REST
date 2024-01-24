import { Request, Response } from "express";
import { TASKS, updateTasksList, updateUser } from "../db";
import { User } from "../models/user.model";
import { Task } from "../models/task.model";

export const deleteTask = (req: Request, res: Response): void => {
  const user = req.user as User;
  if (user && user.role === "Interviewer") {
    const taskId = req.params.id;
    const updatedTasks = TASKS.filter((task) => task.id !== taskId);
    updateTasksList(updatedTasks);
    res.status(200).json({ message: `Task '${taskId}' deleted` });
  } else {
    res.status(403).json({ message: "Permission denied" });
  }
};

export const updateTaskController = (req: Request, res: Response): void => {
  const taskId = req.params.id;
  const foundTask = TASKS.find((task) => task.id === taskId) as Task;

  if (!foundTask) {
    res.sendStatus(404);
    return;
  }

  foundTask.description = req.body.description;
  foundTask.solution = req.body.solution;
  foundTask.complexity = req.body.complexity;
  foundTask.language = req.body.language;
  foundTask.tag = req.body.tag;

  res.json(foundTask);
};
