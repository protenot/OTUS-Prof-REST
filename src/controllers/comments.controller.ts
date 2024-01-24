import { Request, Response } from "express";
import { COMMENTS } from "../db";
import { v4 } from "uuid";
import { createComment } from "..";
import { Comment } from "../models/comment.model";

export const getComments = (req: Request, res: Response): void => {
  const idUser = req.query.idUser as string;
  const idTask = req.query.idTask as string;

  let filteredComments = COMMENTS;
  if (idUser) {
    filteredComments = filteredComments.filter(
      (comment) => comment.idUser === idUser,
    );
  }

  if (idTask) {
    filteredComments = filteredComments.filter(
      (comment) => comment.idTask === idTask,
    );
  }

  res.json(filteredComments);
};

export const getCommentById = (req: Request, res: Response): void => {
  const id = req.params.id;
  const taskComments = COMMENTS.filter((comment) => comment.id === id);
  res.json(taskComments);
};

export const createCommentController = (req: Request, res: Response) => {
  const { idUser, idTask, commentText } = req.body;
  if (!idUser || !idTask || !commentText) {
    return res.status(400).json({
      error: "Необходимо передать idUser, idTask и comment в теле запроса",
    });
  }

  const newComment: Comment = {
    id: v4(),
    idUser,
    idTask,
    commentText,
  };
  createComment(newComment);
  res.json({ message: "Комментарий успешно создан", comment: newComment });
};
