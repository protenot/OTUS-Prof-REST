"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const passport_config_1 = __importDefault(require("./passport-config"));
const method_override_1 = __importDefault(require("method-override"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("./routes"));
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const app = (0, express_1.default)();
const port = 3000;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
        },
    },
    apis: ["./src/routes.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
(0, passport_config_1.default)(passport_1.default, (email) => db_1.USERS.find((user) => user.email === email), (id) => db_1.USERS.find((user) => user.id === id));
app.use(express_1.default.json());
app.use((0, express_flash_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, method_override_1.default)("_method"));
app.use("/", routes_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
const createUser = (user) => {
    const userId = (0, uuid_1.v4)();
    const newUser = Object.assign({ id: userId }, user);
    db_1.USERS.push(newUser);
    return newUser;
};
const information = [];
app.get("/", checkAuthenticated, (req, res) => {
    res.render("index.ejs", { name: req.user.name });
});
app.get("/login", checkNotAuthenticated, (req, res) => {
    console.log("Flash messages:", req.flash("error"));
    res.render("login", { messages: req.flash("error") });
});
app.post("/login", passport_1.default.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
}));
app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
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
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        db_1.USERS.push({
            id: (0, uuid_1.v4)(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        res.redirect("/login");
    }
    catch (_a) {
        res.redirect("/register");
    }
}));
app.post("/users", (req, res) => {
    const newUser = createUser({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        role: "UNKNOWN",
        password: req.body.password,
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
app.delete("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
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
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
}
