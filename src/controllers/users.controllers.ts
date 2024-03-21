import { Request, Response } from "express";
import { myDataSource2Pg } from "../routes/routes";

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.id;
    const repo = myDataSource2Pg.getRepository("User");
    const deleteResult = await repo.delete({
      id: userId,
    });

    if (deleteResult.affected === 0) {
      res.status(404).json({ message: `User with id '${userId}' not found` });
    } else {
      res
        .status(200)
        .json({ message: `User with id '${userId}' deleted successfully` });
    }
  } catch {
    res.status(403).json({ message: "Permission denied" });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.id;
    const repo = myDataSource2Pg.getRepository("User");
    const toUpdate = { ...req.body };
    const updateResult = await repo.update({ id: userId }, toUpdate);
    if (updateResult.affected === 0) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};
