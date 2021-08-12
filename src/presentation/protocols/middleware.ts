import { HttpRequest, HttpResponse } from '.';
export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
