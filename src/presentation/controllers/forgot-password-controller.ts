import { ForgotPassword } from '@src/domain/usecases/forgot-password';
import { LoadAccountByEmail } from '@src/domain/usecases/load-account-by-email';
import {
  badRequest,
  notFounError,
  serverError,
} from '@src/presentation/helpers/http/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from '@src/presentation/protocols';

export class ForgotPasswordController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAccountByEmail: LoadAccountByEmail,
    private readonly forgotPassword: ForgotPassword
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { email } = httpRequest.body;
      const account = await this.loadAccountByEmail.loadByEmail(email);
      if (!account) {
        return notFounError('email');
      }
      await this.forgotPassword.forgot(account.id);
    } catch (error) {
      return serverError(error);
    }
  }
}
