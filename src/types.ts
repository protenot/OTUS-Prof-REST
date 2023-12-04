export type UsersType = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: "Admin" | "User" | "Gest";
};

export type PartialUsersType = Omit<UsersType, "id">;
