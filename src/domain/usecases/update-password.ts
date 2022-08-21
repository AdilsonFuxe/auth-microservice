export type UpdatePassword = (
  id: string,
  password: string
) => UpdatePassword.Response;
export namespace UpdatePassword {
  export type Response = Promise<void>;
}
