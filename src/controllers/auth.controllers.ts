import { Request, Response, NextFunction } from "express";
import { myDataSource2Pg } from "../routes/routes";

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
export async function getUserByEmail(email: string) {
  try {
    console.log("****");
    const repo = await myDataSource2Pg.getRepository("User");
    console.log("repo ", repo);
    const user = await repo.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error("Error executing query:", error);
  }
  return undefined;
}

export async function getUserById(id: string) {
  try {
    const repo = await myDataSource2Pg.getRepository("User");

    const foundUser = await repo.findOne({ where: { id } });
    return foundUser;
  } catch (error) {
    console.error("Error executing query:", error);
  }
  return undefined;
}
