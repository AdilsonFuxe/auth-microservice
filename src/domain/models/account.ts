type Session = {
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountModel = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sessions: Session[];
  forgotPasswordAccessToken: number;
  forgotPasswordExpiresIn: Date;
  createdAt: Date;
  updatedAt: Date;
};
