import { v4 } from "uuid";
import { UsersType, PartialUsersType, TasksType } from "./types";

export let USERS: UsersType[] = [
  {
    id: v4(),
    name: "Olga",
    surname: "Belaya",
    email: "protenot@gmail.com",
    role: "User",
  },
];

export const updateUserList = (newUsers: UsersType[]) => {
  USERS = newUsers;
};

export let TASKS: TasksType[] = [
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

export const updateTasksList = (newTasks: TasksType[]) => {
  TASKS = newTasks;
};
