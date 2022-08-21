import { ok, unauthorized, tryCatch } from '@src/presentation/helpers';
import { BuildAuthMiddleWare } from './protocols';

const buildAuthMiddleware: BuildAuthMiddleWare =
  ({ loadAccountByToken }) =>
  async (httpRequest) => {
    const header =
      httpRequest.headers?.['x-access-token'] ||
      httpRequest.headers?.authorization;
    if (header) {
      const accessToken = header.replace(/^Bearer\s+/, '');
      const account = await loadAccountByToken(accessToken);
      console.log(account);
      console.log(accessToken);
      if (account) {
        return ok({ accountId: account.id });
      }
    }
    return unauthorized();
  };

export const authMiddleware = tryCatch(buildAuthMiddleware);
