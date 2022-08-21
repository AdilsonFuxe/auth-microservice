export type Authentication = (
  params: Authentication.Params
) => Authentication.Response;
export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };
  export type Response = Promise<string>;
}
