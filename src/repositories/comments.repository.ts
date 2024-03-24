import { myDataSource } from "../config/dataSource";
import { Comment } from "../models/comment.entity";

export const commentRepository = myDataSource.getRepository(Comment);
