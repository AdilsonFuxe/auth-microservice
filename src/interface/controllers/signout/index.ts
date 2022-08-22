import { noContent, tryCatch } from '@src/interface/helpers';
import { BuildSignoutController } from './protocols';

const buildSignoutController: BuildSignoutController =
  ({ signout }) =>
  async (httpRequest) => {
    await signout(httpRequest.accountId);
    return noContent();
  };

export const signoutController = tryCatch(buildSignoutController);
