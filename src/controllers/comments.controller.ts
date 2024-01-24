import { Request, Response } from "express";
import { COMMENTS, updateCommentsList } from "../db";
import { v4 } from "uuid";
import { Comment } from "../models/comment.model";

export const createComment = (comment: Comment) => {
  COMMENTS.push(comment);
};

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
  res
    .status(200)
    .json({ message: "Комментарий успешно создан", comment: newComment });
};

export const updateCommentsController = (req: Request, res: Response) => {
  const foundComment = COMMENTS.find((c) => c.id === req.params.id);
  if (!foundComment) {
    res.sendStatus(404);
    return;
  }
  foundComment.commentText = req.body.commentText;

  res.json({ message: "Комментарий успешно изменен", comment: foundComment });
};

export const deleteComment = (req: Request, res: Response) => {
  const updatedComments = COMMENTS.filter((c) => c.id !== req.params.id);
  updateCommentsList(updatedComments);
  res.status(200).json({ message: `Comment '${req.params.id}' deleted` });
};
