import { Repository } from "typeorm";
import { myDataSource2Pg } from "../routes/routes";
import { Comment } from "../models/comment.model";

export const commentRepository = (): Repository<Comment> => {
  return myDataSource2Pg.getRepository("Comment");
};