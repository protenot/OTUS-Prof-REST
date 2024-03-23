import express from "express";
import passport from "passport";
import {
  getUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/users.controllers";
import {
  getTask,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/tasks.controllers";
import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
  updateComments,
} from "../controllers/comments.controller";
import {
  checkAuthenticated,
  checkNotAuthenticated,
} from "../controllers/auth.controllers";
import { User } from "../models/user.model";
import { NextFunction } from "express";

export const myDataSource2Pg = require("../config/db-config").default;

export async function initializeDataSource() {
  await myDataSource2Pg.initialize();
}

const router = express.Router();

initializeDataSource();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users.
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users.
 */
router.get("/users", getUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user.
 */
router.get("/users/:id", getUserById);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Post user.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: user.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post a single user.
 */

router.post("/users", createUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user.
 */

router.delete("/users/:id", deleteUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user.
 */

router.put("/users/:id", updateUser);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 */
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get a list of tasks.
 *     tags: [Tasks]
 *     responses:
 *       '200':
 *         description: A list of tasks.
 */
router.get("/tasks", getTask);
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single task.
 */

router.get("/tasks/:id", getTaskById);

/* @swagger
 * /tasks:
 *   post:
 *     summary: Post task.
 *     tags: [Tasks]
 *     responses:
 *       '200':
 *         description: A new task.
 */

router.post("/tasks", createTask);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task by ID.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single task.
 */

router.delete("/tasks/:id", deleteTask);
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update user by ID.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user.
 */

router.put("/tasks/:id", updateTask);
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
router.get("/comments", getComments);
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
router.get("/comments/:id", getCommentById);

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
router.post("/comments", createComment);

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

router.put("/comments/:id", updateComments);
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

router.delete("/comments/:id", deleteComment);

router.get("/", checkAuthenticated, (req, res) => {
  if (req.user) {
    const { name } = req.user as User;
    res.render("index.ejs", { name });
  } else {
    res.redirect("/login");
  }
});

router.get("/login", checkNotAuthenticated, (req, res) => {
  console.log("Flash messages:", req.flash("error"));
  res.render("login", { messages: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
);
router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

router.post("/register", createUser);

router.delete("/logout", (req, res, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

export default router;
