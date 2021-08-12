export interface ForgotPassword {
  forgot: (id: string) => Promise<void>;
}
