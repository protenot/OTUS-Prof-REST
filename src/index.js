var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import path from "path";
import { v4 } from "uuid";
import { TASKS, USERS, COMMENTS, updateUserList, updateTasksList, updateCommentsList, } from "./db";
import bcrypt from "bcrypt";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import initializePassport from "./passport-config";
import methodOverride from "method-override";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
export const app = express();
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
const swaggerSpec = swaggerJsdoc(options);
initializePassport(passport, (email) => USERS.find((user) => user.email === email), (id) => USERS.find((user) => user.id === id));
app.use(express.json());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
//app.set("view engine", "ejs");
//app.set("view engine", "vjs");
//app.set("views", path.join(__dirname, "views"));
//app.set("dist", path.join(__dirname, "dist"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
//app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static('dist'));
app.use((req, res, next) => {
    console.log(`Received request for: ${req.url}`);
    next();
});
export const createUser = (user) => {
    const userId = v4();
    const newUser = Object.assign({ id: userId }, user);
    USERS.push(newUser);
    console.log(newUser);
    return newUser;
};
export const createComment = (comment) => {
    COMMENTS.push(comment);
};
app.get("/", checkAuthenticated, (req, res) => {
    if (req.user) {
        const { name } = req.user;
        res.render("index.ejs", { name });
    }
    else {
        res.redirect("/login");
    }
});
app.get("/login", checkNotAuthenticated, (req, res) => {
    console.log("Flash messages:", req.flash("error"));
    //res.render("login", { messages: req.flash("error") });
    res.sendFile(path.resolve(__dirname, 'src/client', 'index.html'));
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
}));
app.get("/register", checkNotAuthenticated, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src/client', 'register.html'), {}, (err) => {
        if (err) {
            console.error(err);
        }
    });
    //res.sendFile(path.resolve(__dirname,'dist/src/client','index.html'))
    //res.sendFile(path.join(__dirname,'dist/src/client/index.html'))
    //res.render("register.ejs");
});
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt.hash(req.body.password, 10);
        USERS.push({
            id: v4(),
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
app.delete("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
});
//CRUD для users
app.get("/users", (req, res) => {
    console.log("Flash messages:", req.flash("error"));
    //res.sendFile(path.resolve(__dirname,'dist/src/client','register.html'))
    //res.render('index.html')
    // res.json(USERS);
    res.send('HELLOOO');
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
        surname: req.body.surname,
        email: req.body.email,
        role: "User",
        password: req.body.password,
    });
    //console.log(newUser);
    res.status(201).json(USERS);
});
app.delete("/users/:id", (req, res) => {
    const updatedUsers = USERS.filter((c) => c.id !== req.params.id);
    updateUserList(updatedUsers);
    res.status(200).json({ message: `User '${req.params.id}' deleted` });
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
//CRUD для tasks
app.get("/tasks", (req, res) => {
    res.json(TASKS);
});
app.get("/tasks/:id", (req, res) => {
    const foundTask = TASKS.find((c) => c.id === req.params.id);
    if (!foundTask) {
        res.sendStatus(404);
        return;
    }
    res.json(foundTask);
});
app.delete("/tasks/:id", (req, res) => {
    const user = req.user;
    //console.log(user)
    if (user && user.role === "Interviewer") {
        const updatedTasks = TASKS.filter((c) => c.id !== req.params.id);
        updateTasksList(updatedTasks);
        res.status(200).json({ message: `Task '${req.params.id}' deleted` });
    }
    else {
        res.status(403).json({ message: "Permission denied" });
    }
});
app.put("/tasks/:id", (req, res) => {
    const foundTask = TASKS.find((c) => c.id === req.params.id);
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
//CRUDE для комментариев
app.get("/comments", (req, res) => {
    const idUser = req.query.idUser;
    const idTask = req.query.idTask;
    let filteredComments = COMMENTS;
    if (idUser) {
        filteredComments = filteredComments.filter((comment) => comment.idUser === idUser);
    }
    if (idTask) {
        filteredComments = filteredComments.filter((comment) => comment.idTask === idTask);
    }
    res.json(filteredComments);
});
app.get("/comments/:id", (req, res) => {
    const id = req.params.id;
    const taskComments = COMMENTS.filter((comment) => comment.id === id);
    res.json(taskComments);
});
app.post("/comments", (req, res) => {
    const { idUser, idTask, commentText } = req.body;
    if (!idUser || !idTask || !commentText) {
        return res.status(400).json({
            error: "Необходимо передать idUser, idTask и comment в теле запроса",
        });
    }
    const newComment = {
        id: v4(),
        idUser,
        idTask,
        commentText,
    };
    createComment(newComment);
    res.json({ message: "Комментарий успешно создан", comment: newComment });
});
app.put("/comments/:id", (req, res) => {
    const foundComment = COMMENTS.find((c) => c.id === req.params.id);
    if (!foundComment) {
        res.sendStatus(404);
        return;
    }
    foundComment.commentText = req.body.commentText;
    res.json({ message: "Комментарий успешно изменен", comment: foundComment });
});
app.delete("/comments/:id", (req, res) => {
    const updatedComments = COMMENTS.filter((c) => c.id !== req.params.id);
    updateCommentsList(updatedComments);
    res.status(200).json({ message: `Comment '${req.params.id}' deleted` });
});
app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
export function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
export function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
}
