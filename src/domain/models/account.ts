export type AccountModel = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken: string;
  createdAt?: Date;
  updatedAt?: Date;
};
