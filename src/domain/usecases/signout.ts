export type Signout = (
  accountId: string,
  accessToken: string
) => Signout.Response;

export namespace Signout {
  export type Response = Promise<void>;
}
