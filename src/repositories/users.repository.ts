import { myDataSource } from "../config/dataSource";
import { User } from "../models/user.entity";

export const userRepository = myDataSource.getRepository(User);
