import {
  badRequest,
  ok,
  unauthorized,
  tryCatch,
} from '@src/presentation/helpers';
import { BuildSigninController } from './protocols';

const buildSigninController: BuildSigninController =
  ({ validation, authentication }) =>
  async (httpRequest) => {
    const error = validation(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    const { email, password } = httpRequest.body;
    const accessToken = await authentication({ email, password });
    if (!accessToken) {
      return unauthorized();
    }
    return ok({ accessToken });
  };

export const signinController = tryCatch(buildSigninController);
