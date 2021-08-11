import {
  Controller,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  Validation,
} from '@/src/presentation/protocols';

export class SignUpController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(httpRequest.body);
    return Promise.resolve({
      statusCode: HttpStatusCode.ok,
    });
  }
}
