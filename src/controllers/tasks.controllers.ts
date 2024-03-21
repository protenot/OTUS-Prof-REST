import { Request, Response } from "express";
import { myDataSource2Pg } from "../routes/routes";

export const deleteTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const taskId = req.params.id;
    const repo = myDataSource2Pg.getRepository("Task");
    const deleteResult = await repo.delete({ id: taskId });

    if (deleteResult.affected === 0) {
      res.status(404).json({ message: `Task with id '${taskId}' not found` });
    } else {
      res
        .status(200)
        .json({ message: `Task with id '${taskId}' deleted successfully` });
    }
  } catch {
    res.status(403).json({ message: "Permission denied" });
  }
};

export const updateTaskController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const taskId = req.params.id;
    const repo = myDataSource2Pg.getRepository("Task");
    const toUpdate = { ...req.body };
    const updateResult = await repo.update({ id: taskId }, toUpdate);
    if (updateResult.affected === 0) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};
