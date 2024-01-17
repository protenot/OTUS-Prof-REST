export type UsersType = {
  id: string;
  name: string;
  surname?: string;
  email: string;
  role?: "Admin" | "User" | "Interviewer";
  password?: string;
};

export type PartialUsersType = Omit<UsersType, "id">;

export type TasksType = {
  id: string;
  description: string;
  solution: string;
  complexity: number;
  language: string;
  tag: string;
};
