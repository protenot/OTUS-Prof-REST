import { USERS, updateUserList } from "../db";

import express from "express";
import passport from "passport";
import {
  createUser,
  createUserController,
  deleteUser,
  updateUserController,
} from "../controllers/users.controllers";

const router = express.Router();

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
  res.status(200).json(USERS);
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
  const foundUser = USERS.find((c) => c.id === req.params.id);
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
 *     summary: Post new user .
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Api to add new users.
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: A list of users.
 */

router.post("/users", createUserController);
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
 *         description: Api to delete users by id.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user.
 */
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
 *         description: Api to update users by id.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user.
 */

router.put("/users/:id", updateUserController);

export default router;
