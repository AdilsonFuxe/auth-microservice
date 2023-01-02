import { noContent, tryCatch } from '@src/interface/helpers';
import { BuildSignoutController } from './protocols';

const buildSignoutController: BuildSignoutController =
  ({ signout }) =>
  async (httpRequest) => {
    const header =
      httpRequest.headers?.['x-access-token'] ||
      httpRequest.headers?.authorization;
    const accessToken = header.replace(/^Bearer\s+/, '');
    await signout(httpRequest.accountId, accessToken);
    return noContent();
  };

export const signoutController = tryCatch(buildSignoutController);
