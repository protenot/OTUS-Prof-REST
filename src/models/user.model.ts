export interface User {
  id: string;
  name: string;
  surname?: string;
  email: string;
  role?: "Admin" | "User" | "Interviewer";
  password?: string;
}

export type PartialUsersType = Omit<User, "id">;
/* export type PartialUsersType = {
    [K in Exclude<keyof User, "id">]?: User[K];
  }; */
