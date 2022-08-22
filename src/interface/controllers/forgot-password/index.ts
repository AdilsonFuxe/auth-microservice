import {
  badRequest,
  noContent,
  notFoundError,
  tryCatch,
} from '@src/interface/helpers';
import { BuildForgotPasswordController } from './protocols';

const buildForgotPasswordController: BuildForgotPasswordController =
  ({ forgotPassword, loadAccountByEmail, sendMail, validation }) =>
  async (httpRequest) => {
    const error = validation(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    const { email } = httpRequest.body;
    const account = await loadAccountByEmail(email);
    if (!account) {
      return notFoundError('email');
    }
    const { accessToken } = await forgotPassword(account.id);
    await sendMail({
      to: email,
      subject: 'Forgot password ✔',
      text: `Have you forgotten your password? no problem, use the token to change ${accessToken}`,
    });
    return noContent();
  };

export const forgotPasswordController = tryCatch(buildForgotPasswordController);
