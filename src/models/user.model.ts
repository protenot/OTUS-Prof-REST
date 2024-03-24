export interface User {
  id: string;
  name: string;
  surname?: string;
  email: string;
  role?: "Admin" | "User" | "Interviewer" | undefined;
  password?: string;
}

export type userEntity = {
  id: string;
  name: string;
  surname?: string;
  email: string;
  role?: string;
  password?: string;
};
