import { Request, Response } from "express";
import { v4 } from "uuid";
import { commentRepository } from "../repositories/comments.repository";

export const getComments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await commentRepository.find({
      select: {
        id: true,
        idUser: true,
        idTask: true,
        commentText: true,
        data: true,
      },

      order: { id: "ASC" },
    });

    res.send(result);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
export const getCommentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const foundComment = await commentRepository.findOne({
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
    const newComment = await commentRepository.save({
      id: v4(),
      idUser: req.body.idUser,
      idTask: req.body.idTask,
      commentText: req.body.commentText,
    });

    res
      .status(200)
      .json({ message: "Комментарий успешно создан", comment: newComment });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.sendStatus(404);
  }
};
export const updateComments = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const toUpdate = { ...req.body };
    const updateResult = await commentRepository.update(
      { id: userId },
      toUpdate,
    );
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

export const deleteComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const commentId = req.params.id;
    const deleteResult = await commentRepository.delete({
      id: commentId,
    });

    if (deleteResult.affected === 0) {
      res
        .status(404)
        .json({ message: `Comment with id '${commentId}' not found` });
    } else {
      res.status(200).json({
        message: `Comment with id '${commentId}' deleted successfully`,
      });
    }
  } catch {
    res.status(403).json({ message: "Permission denied" });
  }
};
