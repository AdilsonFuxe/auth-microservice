import { ForgotPassword } from '@src/domain/usecases/forgot-password';
import { LoadAccountByEmail } from '@src/domain/usecases/load-account-by-email';
import { SendMail } from '@src/domain/usecases/send-mail';
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
    private readonly forgotPassword: ForgotPassword,
    private readonly sendMail: SendMail
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
      const { accessToken } = await this.forgotPassword.forgot(account.id);
      await this.sendMail.sendMail({
        to: email,
        subject: 'Forgot password ✔',
        text: `Have you forgotten your password? no problem, use the token to change ${accessToken}`,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
