export type Signout = (accountId: string) => Signout.Response;

export namespace Signout {
  export type Response = Promise<void>;
}
