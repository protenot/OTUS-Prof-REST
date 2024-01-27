"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment =
  exports.updateCommentsController =
  exports.createCommentController =
  exports.getCommentById =
  exports.getComments =
  exports.createComment =
    void 0;
const db_1 = require("../db");
const uuid_1 = require("uuid");
const createComment = (comment) => {
  db_1.COMMENTS.push(comment);
};
exports.createComment = createComment;
const getComments = (req, res) => {
  const idUser = req.query.idUser;
  const idTask = req.query.idTask;
  let filteredComments = db_1.COMMENTS;
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
exports.getComments = getComments;
const getCommentById = (req, res) => {
  const id = req.params.id;
  const taskComments = db_1.COMMENTS.filter((comment) => comment.id === id);
  res.json(taskComments);
};
exports.getCommentById = getCommentById;
const createCommentController = (req, res) => {
  const { idUser, idTask, commentText } = req.body;
  if (!idUser || !idTask || !commentText) {
    return res.status(400).json({
      error: "Необходимо передать idUser, idTask и comment в теле запроса",
    });
  }
  const newComment = {
    id: (0, uuid_1.v4)(),
    idUser,
    idTask,
    commentText,
  };
  (0, exports.createComment)(newComment);
  res
    .status(200)
    .json({ message: "Комментарий успешно создан", comment: newComment });
};
exports.createCommentController = createCommentController;
const updateCommentsController = (req, res) => {
  const foundComment = db_1.COMMENTS.find((c) => c.id === req.params.id);
  if (!foundComment) {
    res.sendStatus(404);
    return;
  }
  foundComment.commentText = req.body.commentText;
  res.json({ message: "Комментарий успешно изменен", comment: foundComment });
};
exports.updateCommentsController = updateCommentsController;
const deleteComment = (req, res) => {
  const updatedComments = db_1.COMMENTS.filter((c) => c.id !== req.params.id);
  (0, db_1.updateCommentsList)(updatedComments);
  res.status(200).json({ message: `Comment '${req.params.id}' deleted` });
};
exports.deleteComment = deleteComment;
