import { Repository } from "typeorm";
import { myDataSource2Pg } from "../routes/routes";
import { User } from "../models/user.model";

export const userRepository = (): Repository<User> => {
  return myDataSource2Pg.getRepository("User");
};
