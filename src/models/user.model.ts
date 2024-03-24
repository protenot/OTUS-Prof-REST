export interface User {
  id: string;
  name: string;
  surname?: string;
  email: string;
  role?: "Admin" | "User" | "Interviewer"|undefined;
  password?: string;
}

//export type PartialUsersType = Omit<User, "id">;

export type userEntity={
  id: string;
  name: string;
  surname?: string;
  email: string;
  role?: string;
  password?: string;
}