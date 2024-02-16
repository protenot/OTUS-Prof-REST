export interface Comment{
    id: string;
    idUser: string;
    idTask: string;
    commentText: string;
}
export type NewCommentType = {
    idUser: string;
    idTask: string;
    commentText: string;
  };