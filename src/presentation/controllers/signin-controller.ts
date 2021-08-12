import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from '@src/presentation/protocols';
import { serverError } from '../helpers/http/http-helper';

export class SignInController implements Controller {
  constructor(private readonly validation: Validation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body);
    } catch (error) {
      return serverError(error);
    }
  }
}
