import { Request, Response } from "express";
import { v4 } from "uuid";
import {myDataSource2Pg} from "../routes/routes"


export const getComments = async (req: Request, res: Response): Promise<void> => {

try {
  const repo = await myDataSource2Pg.getRepository("Comment");
  const result = await repo.find({
    select: {
      id: true,
      idUser: true,
      idTask: true,
      commentText: true,
    },

    order: { id: "ASC" },
  });

  res.send(result);
} catch (error) {
  console.error("Error fetching comments:", error);
  res.status(500).json({ error: "Failed to fetch comments" });
}
};
export const getCommentById = async (req: Request, res: Response): Promise<void> => {
try {
  const repo = await myDataSource2Pg.getRepository("Comment");

  const foundComment = await repo.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!foundComment) {
    res.status(404).send("Comment not found");
    return;
  }
  res.json(foundComment);
} catch (error) {
  console.error("Error fetching comment:", error);
  res.status(500).send("Internal Server Error");
}
};

export const createComment = async (req: Request, res: Response) => {

try {
  const repo = await myDataSource2Pg.getRepository("Comment");

  const newComment = await repo.save({
    id: v4(),
    idUser:req.body.idUser,
    idTask:req.body.idTask,
    commentText:req.body.commentText,
  });

  res.status(200).json({ message: "Комментарий успешно создан", comment: newComment });
} catch (error) {
  console.error("Error saving comment:", error);
  res.sendStatus(404);
}
}
export const updateComments = async (req: Request, res: Response) => {

try {
  const userId = req.params.id;
  const repo = myDataSource2Pg.getRepository("Comment");
  const toUpdate = { ...req.body };
  const updateResult = await repo.update({ id: userId }, toUpdate);
  if (updateResult.affected === 0) {
    res.sendStatus(404);
    return;
  }

  res.status(200).json({ message: "Comment updated successfully" });
} catch (error) {
  console.error("Error updating comment:", error);
  res.status(500).json({ error: "Failed to update comment" });
}
};



export const deleteComment =  async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const commentId = req.params.id;
    const repo = myDataSource2Pg.getRepository("Comment");
    const deleteResult = await repo.delete({
      id: commentId,
    });

    if (deleteResult.affected === 0) {
      res.status(404).json({ message: `Comment with id '${commentId}' not found` });
    } else {
      res
        .status(200)
        .json({ message: `Comment with id '${commentId}' deleted successfully` });
    }
  } catch {
    res.status(403).json({ message: "Permission denied" });
  }
};
