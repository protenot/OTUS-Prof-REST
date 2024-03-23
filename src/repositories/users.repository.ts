//import { Repository } from "typeorm";
import { myDataSource } from "../config/db-config";
import { User } from "../models/user.entity";

/*  export const userRepository = (): Repository<User> => {
  return myDataSource.getRepository('User');
};  */
export const userRepository = myDataSource.getRepository(User);
