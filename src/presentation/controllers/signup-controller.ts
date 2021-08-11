import { AddAccount } from '@/src/domain/usecases';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  Validation,
} from '@/src/presentation/protocols';
import { ContactInUseError } from '../errors';
import {
  badRequest,
  forbidden,
  serverError,
} from '../helpers/http/http-helper';

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { firstName, lastName, email, password } = httpRequest.body;
      const account = await this.addAccount.add({
        firstName,
        lastName,
        email,
        password,
      });
      if (!account) {
        return forbidden(new ContactInUseError());
      }
      return Promise.resolve({
        statusCode: HttpStatusCode.ok,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
