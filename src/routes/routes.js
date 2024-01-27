"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("../controllers/users.controllers");
const tasks_controllers_1 = require("../controllers/tasks.controllers");
const comments_controller_1 = require("../controllers/comments.controller");
const router = express_1.default.Router();
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
router.get("/users", (req, res) => {
    res.status(200).json(db_1.USERS);
});
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
router.get("/users/:id", (req, res) => {
    //const userId = req.params.id;
    //res.json({ id: userId, name: `User ${userId}` });
    const foundUser = db_1.USERS.find((c) => c.id === req.params.id);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    res.json(foundUser);
});
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add new user.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: A list of users.
 */
router.post("/users", users_controllers_1.createUserController);
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
router.delete("/users/:id", users_controllers_1.deleteUser);
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
router.put("/users/:id", users_controllers_1.updateUserController);
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
router.get("/tasks", (req, res) => {
    res.json(db_1.TASKS);
});
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
router.get("/tasks/:id", (req, res) => {
    const foundTask = db_1.TASKS.find((c) => c.id === req.params.id);
    if (!foundTask) {
        res.sendStatus(404);
        return;
    }
    res.json(foundTask);
});
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
router.delete("/tasks/:id", tasks_controllers_1.deleteTask);
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
router.put("/tasks/:id", tasks_controllers_1.updateTaskController);
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
router.get("/comments", comments_controller_1.getComments);
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
router.get("/comments/:id", comments_controller_1.getCommentById);
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
router.post("/comments", comments_controller_1.createCommentController);
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
router.put("/comments/:id", comments_controller_1.updateCommentsController);
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
router.delete("/comments/:id", comments_controller_1.deleteComment);
exports.default = router;
