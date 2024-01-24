import { v4 } from "uuid";
import { User, PartialUsersType } from "./models/user.model";
import { Comment } from "./models/comment.model";
import { Task } from "./models/task.model";

export let USERS: User[] = [
  {
    id: "1",
    name: "Olga",
    surname: "Belaya",
    email: "protenot@gmail.com",
    role: "User",
  },
  {
    id: "2",
    name: "Nestor",
    surname: "Petrovich",
    email: "nestor@gmail.com",
    role: "Interviewer",
  },
];

export const updateUserList = (newUsers: User[]) => {
  USERS = newUsers;
};
export const updateUser = (updateUser: User): void => {
  const userIndex = USERS.findIndex((user) => user.id === updateUser.id);
  if (userIndex !== -1) {
    USERS[userIndex] = updateUser;
  }
};

export let TASKS: Task[] = [
  {
    id: "12345",
    description: "Здесь будет задача 1",
    solution: "Здесь будет решение задачи 1",
    complexity: 89,
    language: "TypeScript",
    tag: "Aлгоритмы",
  },
  {
    id: "12346",
    description: "Здесь будет задача 2",
    solution: "Здесь будет решение задачи 2",
    complexity: 89,
    language: "JavaScript",
    tag: "Cтруктуры данных",
  },
  {
    id: "12347",
    description: "Здесь будет задача 3",
    solution: "Здесь будет решение задачи 3",
    complexity: 5,
    language: "JavaScript",
    tag: "Динамическое программирование",
  },
];

export const updateTasksList = (newTasks: Task[]) => {
  TASKS = newTasks;
};
export let COMMENTS: Comment[] = [
  {
    id: "15",
    idUser: "1",
    idTask: "12345",
    commentText: "Это комментарий к задаче 12345",
  },
  {
    id: "16",
    idUser: "1",
    idTask: "12346",
    commentText: "Это комментарий к задаче 12346",
  },
  {
    id: "17",
    idUser: "2",
    idTask: "12345",
    commentText: "Это комментарий юзера 2 к задаче 12345",
  },
  {
    id: "18",
    idUser: "1",
    idTask: "12347",
    commentText: "Это комментарий к задаче 12347",
  },
];
export const updateCommentsList = (newComments: Comment[]) => {
  COMMENTS = newComments;
};
