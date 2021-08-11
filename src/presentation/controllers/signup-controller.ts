import { AddAccount } from '@/src/domain/usecases';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  Validation,
} from '@/src/presentation/protocols';
import { badRequest } from '../helpers/http/http-helper';

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    const { firstName, lastName, email, password } = httpRequest.body;
    await this.addAccount.add({ firstName, lastName, email, password });
    return Promise.resolve({
      statusCode: HttpStatusCode.ok,
    });
  }
}
