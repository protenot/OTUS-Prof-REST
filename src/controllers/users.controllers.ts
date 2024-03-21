import { v4 } from "uuid";
import { USERS, updateUser } from "../db";
import { PartialUsersType, User } from "../models/user.model";
import { Request, Response } from "express";
import { myDataSource2Pg } from "../routes/routes";

export const createUser = (user: PartialUsersType): User => {
  const userId: string = v4();
  const newUser: User = {
    id: userId,
    ...user,
  };
  USERS.push(newUser);
  return newUser;
};

export const createUserController = (req: Request, res: Response): void => {
  const newUser = createUser({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    role: "User",
    password: req.body.password,
  });

  res.status(201).json(newUser);
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.params.id;
  const repo = myDataSource2Pg.getRepository("User");
  //const updatedUsers = USERS.filter((user) => user.id !== userId);
  //updateUserList(updatedUsers);
  await repo.delete({
    id: userId,
  });
  res.status(200).json({ message: `User '${userId}' deleted` });
};

export const updateUserController = (req: Request, res: Response): void => {
  const userId = req.params.id;
  const foundUser = USERS.find((user) => user.id === userId) as User;

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
