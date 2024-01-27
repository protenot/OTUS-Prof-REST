import { USERS } from "./db";
import express from "express";
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
    // res.json([{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]);
    res.json(USERS);
    //  res.render('login.ejs')
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
    const userId = req.params.id;
    res.json({ id: userId, name: `User ${userId}` });
});
export default router;
