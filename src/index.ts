import express from "express";
import path from "path";
import { v4 } from "uuid";
import { UsersType, PartialUsersType } from "./types";
import { TASKS, USERS, updateUserList, updateTasksList } from "./db";
import bcrypt from "bcrypt";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
//import { Strategy as LocalStrategy } from 'passport-local';
//import {initialize} from "./passport-config"
import initializePassport from "./passport-config";
import methodOverride from "method-override";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = 3000;
//initialize(passport, (email: string) => information.find((user: any) => user.email === email));
/* const initializePassport= require('./passport-config')
initializePassport(
    passport,
     email => information.find(user=>user.email === email)) */
initializePassport(
  passport,
  (email: string) => information.find((user: any) => user.email === email),
  (id) => information.find((user) => user.id === id),
);
app.use(express.json());

//console.log(initializePassport(passport, (email: string) => information.find((user: any) => user.email === email)))
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const createUser = (user: PartialUsersType): UsersType => {
  const userId: string = v4();
  const newUser: UsersType = {
    id: userId,
    ...user,
  };
  USERS.push(newUser);
  return newUser;
};
const information = [];
app.get("/", checkAuthenticated, (req, res) => {
  // res.sendFile(path.resolve(__dirname, "index.html"));
  res.render("index.ejs", { name: req.user.name });
});
app.get("/login", checkNotAuthenticated, (req, res) => {
  console.log("Flash messages:", req.flash("error"));
  res.render("login", { messages: req.flash("error") });
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
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

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    information.push({
      id: v4(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
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
  const updatedUsers = USERS.filter((c) => c.id !== req.params.id);
  updateUserList(updatedUsers);
  res.status(200).json({ message: `User '${req.params.id}' deleted` });
});

app.delete("/tasks/:id", (req, res) => {
  const updatedTasks = TASKS.filter((c) => c.id !== req.params.id);
  updateTasksList(updatedTasks);
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
