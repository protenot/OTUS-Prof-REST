import express from "express";
import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
  updateComments,
} from "../controllers/comments.controller";

const commentsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments
 */
/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get a list of comments.
 *     tags: [Comments]
 *     responses:
 *       '200':
 *         description: A list of comments.
 */
commentsRouter.get("/comments", getComments);
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get comment by ID.
 *     tags: [Comments]
 *
 *     responses:
 *       '200':
 *         description: A single comment.
 */
commentsRouter.get("/comments/:id", getCommentById);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Add new comment.
 *     tags: [Comments]
 *     responses:
 *       '200':
 *         description: A list of comments.
 */
commentsRouter.post("/comments", createComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update comment by ID.
 *     tags: [Comments]
 *     responses:
 *       '200':
 *         description: A single comment.
 */

commentsRouter.put("/comments/:id", updateComments);
/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete comment by ID.
 *     tags: [Comments]
 *     responses:
 *       '200':
 *         description: A single comment.
 */

commentsRouter.delete("/comments/:id", deleteComment);

export default commentsRouter;
