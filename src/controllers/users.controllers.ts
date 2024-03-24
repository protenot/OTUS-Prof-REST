import { Request, Response } from "express";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/users.repository";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },

      order: { name: "ASC" },
    });

    res.send(result);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role || "User";

    const savedUser = await userRepository.save({
      id: v4(),
      name: req.body.name,
      email: req.body.email,
      role: role,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Пользователь успешно создан 'name'",
      name: savedUser.name,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const foundUser = await userRepository.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!foundUser) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).json(foundUser);
  } catch (error) {
    console.error("Error fetching user by id:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.id;
    const deleteResult = await userRepository.delete({
      id: userId,
    });

    if (deleteResult.affected === 0) {
      res.status(404).json({ message: `User with id '${userId}' not found` });
    } else {
      res
        .status(200)
        .json({ message: `User with id '${userId}' deleted successfully` });
    }
  } catch {
    res.status(403).json({ message: "Permission denied" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.id;
    const toUpdate = { ...req.body };
    const updateResult = await userRepository.update({ id: userId }, toUpdate);
    if (updateResult.affected === 0) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};
