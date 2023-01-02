import { BuildDbSignoutRepository } from './protocols';

export const dbSignout: BuildDbSignoutRepository =
  ({ signoutRepository }) =>
  async (accountId: string, accessToken: string) => {
    await signoutRepository(accountId, accessToken);
  };
