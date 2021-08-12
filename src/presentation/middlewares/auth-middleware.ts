import { serverError } from '../helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class AuthMiddleware implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
    } catch (error) {
      return serverError(error);
    }
  }
}
