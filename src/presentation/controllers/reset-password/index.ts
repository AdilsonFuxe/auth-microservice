import {
  InvalidAccessTokenError,
  TokenExpiredError,
} from '@src/presentation/errors';
import {
  badRequest,
  noContent,
  notFoundError,
  tryCatch,
} from '@src/presentation/helpers';
import { BuildResetPasswordController } from './protocols';

const buildResetPasswordController: BuildResetPasswordController =
  ({ updatePassword, loadAccountByEmail, validation }) =>
  async (httpRequest) => {
    const error = validation(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    const { email, accessToken, password } = httpRequest.body;
    const account = await loadAccountByEmail(email);
    if (!account) {
      return notFoundError('email');
    }
    if (account.forgotPasswordAccessToken !== accessToken) {
      return badRequest(new InvalidAccessTokenError());
    }
    const now = new Date();
    if (now > account.forgotPasswordExpiresIn) {
      return badRequest(new TokenExpiredError());
    }
    await updatePassword(account.id, password);
    return noContent();
  };

export const resetPasswordController = tryCatch(buildResetPasswordController);
