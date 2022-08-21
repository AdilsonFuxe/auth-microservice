export type ForgotPassword = (id: string) => ForgotPassword.Response;
export namespace ForgotPassword {
  type ForgotPasswordResponse = {
    accessToken: number;
    expiresIn: Date;
  };
  export type Response = Promise<ForgotPasswordResponse>;
}
