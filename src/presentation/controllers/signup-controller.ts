import {
  Controller,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  Validation,
} from '@/src/presentation/protocols';
import { badRequest } from '../helpers/http/http-helper';

export class SignUpController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    return Promise.resolve({
      statusCode: HttpStatusCode.ok,
    });
  }
}
