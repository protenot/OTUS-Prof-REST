"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.deleteUser = exports.createUserController = exports.createUser = void 0;
const uuid_1 = require("uuid");
const db_1 = require("../db");
const createUser = (user) => {
    const userId = (0, uuid_1.v4)();
    const newUser = Object.assign({ id: userId }, user);
    db_1.USERS.push(newUser);
    return newUser;
};
exports.createUser = createUser;
const createUserController = (req, res) => {
    const newUser = (0, exports.createUser)({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        role: "User",
        password: req.body.password,
    });
    res.status(201).json(newUser);
};
exports.createUserController = createUserController;
const deleteUser = (req, res) => {
    const userId = req.params.id;
    const updatedUsers = db_1.USERS.filter((user) => user.id !== userId);
    (0, db_1.updateUserList)(updatedUsers);
    res.status(200).json({ message: `User '${userId}' deleted` });
};
exports.deleteUser = deleteUser;
const updateUserController = (req, res) => {
    const userId = req.params.id;
    const foundUser = db_1.USERS.find((user) => user.id === userId);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    foundUser.name = req.body.name;
    foundUser.surname = req.body.surname;
    foundUser.email = req.body.email;
    foundUser.role = req.body.role;
    (0, db_1.updateUser)(foundUser);
    res.json(foundUser);
};
exports.updateUserController = updateUserController;
