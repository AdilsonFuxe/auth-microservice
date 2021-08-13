import { AccountModel } from '@src/domain/models';
import { LoadAccountByEmail } from '@src/domain/usecases/load-account-by-email';
import { mockAccount } from '@test-suite/domain';

export const mockLoadAccountByEmail = (): LoadAccountByEmail => {
  class LoadAccountByEmailStub implements LoadAccountByEmail {
    async loadByEmail(): Promise<AccountModel> {
      return Promise.resolve(mockAccount());
    }
  }
  return new LoadAccountByEmailStub();
};
