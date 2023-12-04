import express from "express";
import path from "path";
import { v4 } from "uuid";
import { UsersType, PartialUsersType } from "./types";
const app = express();
const port = 3000;

app.use(express.json());

let USERS: UsersType[] = [
  {
    id: v4(),
    name: "Olga",
    surname: "Belaya",
    email: "protenot@gmail.com",
    role: "User",
  },
];
const createUser = (user: PartialUsersType): UsersType => {
  const userId: string = v4();
  const newUser: UsersType = {
    id: userId,
    ...user,
  };
  USERS.push(newUser);
  return newUser;
};
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
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
