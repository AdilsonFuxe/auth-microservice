export type ForgotPasswordResponse = {
  accessToken?: number;
  expiresIn?: Date;
};

export interface ForgotPassword {
  forgot: (id: string) => Promise<ForgotPasswordResponse>;
}
