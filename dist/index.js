"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const createUser = (user) => {
    const userId = (0, uuid_1.v4)();
    const newUser = Object.assign({ id: userId }, user);
    db_1.USERS.push(newUser);
    return newUser;
};
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "index.html"));
});
app.get("/users", (req, res) => {
    res.json(db_1.USERS);
});
app.get("/users/:id", (req, res) => {
    const foundUser = db_1.USERS.find((c) => c.id === req.params.id);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    res.json(foundUser);
});
app.get("/tasks", (req, res) => {
    res.json(db_1.TASKS);
});
app.get("/tasks/:id", (req, res) => {
    const foundTask = db_1.TASKS.find((c) => c.id === req.params.id);
    if (!foundTask) {
        res.sendStatus(404);
        return;
    }
    res.json(foundTask);
});
app.post("/users", (req, res) => {
    const newUser = createUser({
        name: req.body.name,
        surname: "UNKNOWN",
        email: "UNKNOWN",
        role: "Admin",
    });
    console.log(newUser);
    res.status(201).json(db_1.USERS);
});
app.delete("/users/:id", (req, res) => {
    const updatedUsers = db_1.USERS.filter((c) => c.id !== req.params.id);
    (0, db_1.updateUserList)(updatedUsers);
    res.status(200).json({ message: `User '${req.params.id}' deleted` });
});
app.delete("/tasks/:id", (req, res) => {
    const updatedTasks = db_1.TASKS.filter((c) => c.id !== req.params.id);
    (0, db_1.updateTasksList)(updatedTasks);
    res.status(200).json({ message: `Task '${req.params.id}' deleted` });
});
app.put("/users/:id", (req, res) => {
    const foundUser = db_1.USERS.find((c) => c.id === req.params.id);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    foundUser.name = req.body.name;
    foundUser.surname = req.body.surname;
    foundUser.email = req.body.email;
    foundUser.role = req.body.role;
    res.json(foundUser);
});
app.put("/tasks/:id", (req, res) => {
    const foundTask = db_1.TASKS.find((c) => c.id === req.params.id);
    if (!foundTask) {
        res.sendStatus(404);
        return;
    }
    foundTask.description = req.body.description;
    foundTask.solution = req.body.solution;
    foundTask.complexity = req.body.complexity;
    foundTask.language = req.body.language;
    foundTask.tag = req.body.tag;
    res.json(foundTask);
});
app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
