"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
let USERS = [
    {
        id: (0, uuid_1.v4)(),
        name: "Olga",
        surname: "Belaya",
        email: "protenot@gmail.com",
        role: "User",
    },
];
const createUser = (user) => {
    const userId = (0, uuid_1.v4)();
    const newUser = Object.assign({ id: userId }, user);
    USERS.push(newUser);
    return newUser;
};
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "index.html"));
});
app.get("/users", (req, res) => {
    res.json(USERS);
});
app.get("/users/:id", (req, res) => {
    const foundUser = USERS.find((c) => c.id === req.params.id);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    res.json(foundUser);
});
app.post("/users", (req, res) => {
    const newUser = createUser({
        name: req.body.name,
        surname: "UNKNOWN",
        email: "UNKNOWN",
        role: "Admin",
    });
    console.log(newUser);
    res.status(201).json(USERS);
});
app.delete("/users/:id", (req, res) => {
    USERS = USERS.filter((c) => c.id !== req.params.id);
    res.status(200).json({ message: "User deleted" });
});
app.put("/users/:id", (req, res) => {
    const foundUser = USERS.find((c) => c.id === req.params.id);
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
app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
