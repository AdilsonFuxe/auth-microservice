export type Validation = (input: Validation.Params) => Validation.Response;

export namespace Validation {
  export type Params = any;
  export type Response = Error | null;
}
