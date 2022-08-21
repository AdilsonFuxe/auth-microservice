export type PasswordHashCompare = (
  value: string,
  hash: string
) => PasswordHashCompare.Response;

export namespace PasswordHashCompare {
  export type Response = Promise<boolean>;
}
