export type Encrypt = (value: string) => Encrypt.Response;

export namespace Encrypt {
  export type Response = Promise<string>;
}
