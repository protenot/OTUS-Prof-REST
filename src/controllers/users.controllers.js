import { v4 } from "uuid";
import { USERS, updateUser, updateUserList } from "../db";
export const createUser = (user) => {
  const userId = v4();
  const newUser = Object.assign({ id: userId }, user);
  USERS.push(newUser);
  return newUser;
};
export const createUserController = (req, res) => {
  const newUser = createUser({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    role: "User",
    password: req.body.password,
  });
  res.status(201).json(newUser);
};
export const deleteUser = (req, res) => {
  const userId = req.params.id;
  const updatedUsers = USERS.filter((user) => user.id !== userId);
  updateUserList(updatedUsers);
  res.status(200).json({ message: `User '${userId}' deleted` });
};
export const updateUserController = (req, res) => {
  const userId = req.params.id;
  const foundUser = USERS.find((user) => user.id === userId);
  if (!foundUser) {
    res.sendStatus(404);
    return;
  }
  foundUser.name = req.body.name;
  foundUser.surname = req.body.surname;
  foundUser.email = req.body.email;
  foundUser.role = req.body.role;
  updateUser(foundUser);
  res.json(foundUser);
};
