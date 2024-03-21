import { COMMENTS, updateCommentsList } from "../db";
import { v4 } from "uuid";
export const createComment = (comment) => {
    COMMENTS.push(comment);
};
export const getComments = (req, res) => {
    const idUser = req.query.idUser;
    const idTask = req.query.idTask;
    let filteredComments = COMMENTS;
    if (idUser) {
        filteredComments = filteredComments.filter((comment) => comment.idUser === idUser);
    }
    if (idTask) {
        filteredComments = filteredComments.filter((comment) => comment.idTask === idTask);
    }
    res.json(filteredComments);
};
export const getCommentById = (req, res) => {
    const id = req.params.id;
    const taskComments = COMMENTS.filter((comment) => comment.id === id);
    res.json(taskComments);
};
export const createCommentController = (req, res) => {
    const { idUser, idTask, commentText } = req.body;
    if (!idUser || !idTask || !commentText) {
        return res.status(400).json({
            error: "Необходимо передать idUser, idTask и comment в теле запроса",
        });
    }
    const newComment = {
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
export const updateCommentsController = (req, res) => {
    const foundComment = COMMENTS.find((c) => c.id === req.params.id);
    if (!foundComment) {
        res.sendStatus(404);
        return;
    }
    foundComment.commentText = req.body.commentText;
    res.json({ message: "Комментарий успешно изменен", comment: foundComment });
};
export const deleteComment = (req, res) => {
    const updatedComments = COMMENTS.filter((c) => c.id !== req.params.id);
    updateCommentsList(updatedComments);
    res.status(200).json({ message: `Comment '${req.params.id}' deleted` });
};
