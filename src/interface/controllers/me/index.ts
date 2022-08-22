import { ok, unauthorized, tryCatch } from '@src/interface/helpers';
import { BuildMeController } from './protocols';

const buildMeController: BuildMeController =
  ({ loadAccountById }) =>
  async (httpRequest) => {
    const account = await loadAccountById(httpRequest.accountId);
    if (!account) {
      return unauthorized();
    }
    return ok({
      id: account.id,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
    });
  };

export const meController = tryCatch(buildMeController);
