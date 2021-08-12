import { AccountModel } from '@src/domain/models';
import { LoadAccountByToken } from '@src/domain/usecases/load-account-by-token';
import { mockAccount } from '@test-suite/domain';

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async loadByToken(): Promise<AccountModel> {
      return Promise.resolve(mockAccount());
    }
  }
  return new LoadAccountByTokenStub();
};
