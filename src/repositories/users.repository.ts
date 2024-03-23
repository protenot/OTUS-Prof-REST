
import { myDataSource } from "../config/db-config";
import { User } from "../models/user.entity";


export const userRepository = myDataSource.getRepository(User);
