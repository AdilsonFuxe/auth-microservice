import { BuildDbSignoutRepository } from './protocols';

export const dbSignout: BuildDbSignoutRepository =
  ({ signoutRepository }) =>
  async (accountId: string) => {
    await signoutRepository(accountId);
  };
