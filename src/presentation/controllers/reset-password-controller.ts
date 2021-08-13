import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from '@src/presentation/protocols';
import {
  badRequest,
  notFounError,
  serverError,
} from '@src/presentation/helpers/http/http-helper';
import { LoadAccountByEmail } from '@src/domain/usecases/load-account-by-email';
import { InvalidAccessTokenError, TokenExpiredError } from '../errors';
import { UpdatePassword } from '@src/domain/usecases/update-password';

export class ResetPasswordController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAccountByEmail: LoadAccountByEmail,
    private readonly updatePassword: UpdatePassword
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { email, accessToken, password } = httpRequest.body;
      const account = await this.loadAccountByEmail.loadByEmail(email);
      if (!account) {
        return notFounError('email');
      }
      if (account.forgotPasswordAccessToken !== accessToken) {
        return badRequest(new InvalidAccessTokenError());
      }
      const now = new Date();
      if (now > account.forgotPasswordExpiresIn) {
        return badRequest(new TokenExpiredError());
      }
      await this.updatePassword.updatePasseword(account.id, password);
    } catch (error) {
      return serverError(error);
    }
  }
}
