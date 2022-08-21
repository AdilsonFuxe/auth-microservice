export type PasswordHash = (value: string) => PasswordHash.Response;

export namespace PasswordHash {
  export type Response = Promise<string>;
}
