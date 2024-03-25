import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/users.repository";
import { userEntity } from "../models/user.model";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

export function checkAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

export function checkNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
}
export async function getUserByEmail(
  email: string,
): Promise<userEntity | undefined> {
  try {
    console.log("****");

    const user: userEntity | null = await userRepository.findOne({
      where: { email },
    });
    return user ?? undefined;
  } catch (error) {
    console.error("Error executing query:", error);
    return undefined;
  }
}

export async function getUserById(id: string): Promise<userEntity | undefined> {
  try {
    const foundUser: userEntity | null = await userRepository.findOne({
      where: { id },
    });
    return foundUser ?? undefined;
  } catch (error) {
    console.error("Error executing query:", error);
  }
  return undefined;
}

export const createUserAfterRegistration = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role || "User";

    await userRepository.save({
      id: v4(),
      name: req.body.name,
      email: req.body.email,
      role: role,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Internal Server Error");
  }
};
