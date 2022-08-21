export type Decrypt = (value: string) => Decrypt.Response;
export namespace Decrypt {
  export type Response = Promise<string | null>;
}
