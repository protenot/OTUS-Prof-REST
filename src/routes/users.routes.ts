import express from "express";
//import {initializeDataSource} from "./routes"
import {
    getUser,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
  } from "../controllers/users.controllers";
  const usersRouter = express.Router();
  //initializeDataSource();
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
usersRouter.get("/users", getUser);

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
usersRouter.get("/users/:id", getUserById);
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

usersRouter.post("/users", createUser);

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

usersRouter.delete("/users/:id", deleteUser);
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

usersRouter.put("/users/:id", updateUser);

  export default usersRouter