import { HttpRequest, HttpResponse } from '.';

export type Controller = (params: Controller.Params) => Controller.Response;

export namespace Controller {
  export type Params = HttpRequest;
  export type Response = Promise<HttpResponse>;
}
