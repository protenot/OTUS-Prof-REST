import express from "express";
import path from "path";
import { v4 } from "uuid";
import { UsersType, PartialUsersType } from "./types";
import { TASKS, USERS, updateUserList, updateTasksList } from "./db";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

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
app.get("/", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "index.html"));
  res.render("index.ejs", { name: "Igor" });
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
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
app.post("/login", (req, res) => {});

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
