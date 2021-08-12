import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from '@src/presentation/protocols';
import { badRequest, serverError } from '../helpers/http/http-helper';

export class SignInController implements Controller {
  constructor(private readonly validation: Validation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
