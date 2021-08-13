import { serverError } from '@src/presentation/helpers/http/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from '@src/presentation/protocols';

export class ForgotPasswordController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body);
    } catch (error) {
      return serverError(error);
    }
  }
}
