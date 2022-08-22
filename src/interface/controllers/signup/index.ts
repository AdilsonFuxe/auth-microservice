import { ContactInUseError } from '@src/interface/errors';
import { badRequest, created, tryCatch } from '@src/interface/helpers';
import { BuildSignupController } from './protocols';

const buildSignupController: BuildSignupController =
  ({ validation, addAccount, authentication, loadAccountByEmail }) =>
  async (httpRequest) => {
    const error = validation(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    const { firstName, lastName, email, password } = httpRequest.body;
    const account = await loadAccountByEmail(email);
    if (account) {
      return badRequest(new ContactInUseError());
    }
    await addAccount({ firstName, lastName, email, password });
    const accessToken = await authentication({ email, password });
    return created({ accessToken });
  };

export const signupController = tryCatch(buildSignupController);
