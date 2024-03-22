import { Request, Response } from "express";
import { myDataSource2Pg } from "../routes/routes";
import { v4 } from "uuid";

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const repo = await myDataSource2Pg.getRepository("Task");
    const result = await repo.find({
      select: {
        id: true,
        description: true,
        complexity: true,
        language: true,
        tag: true,
      },

      order: { id: "ASC" },
    });

    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const repo = await myDataSource2Pg.getRepository("Task");

    const foundTask = await repo.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!foundTask) {
      res.status(404).send("Task not found");
      return;
    }
    res.status(200).json(foundTask);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).send("Internal Server Error");
  }
};
export const createTask = async (req: Request, res: Response) => {
  try {
    const repo = await myDataSource2Pg.getRepository("Task");

    const newTask = await repo.save({
      id: v4(),
      description: req.body.description,
      solution: req.body.solution,
      complexity: req.body.complexity,
      language: req.body.language,
      tag: req.body.tag,
    });

    res.status(200).json({ message: "Задача успешно создана", id: newTask.id });
  } catch (error) {
    console.error("Error saving task:", error);
    res.sendStatus(404);
  }
};

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

export const updateTask = async (
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
