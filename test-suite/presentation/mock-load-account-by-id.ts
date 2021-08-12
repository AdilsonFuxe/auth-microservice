import { AccountModel } from '@src/domain/models';
import { LoadAccountById } from '@src/domain/usecases/load-account-by-id';
import { mockAccount } from '@test-suite/domain';

export const mockLoadAccountById = (): LoadAccountById => {
  class LoadAccountByIdStub implements LoadAccountById {
    async loadById(): Promise<AccountModel> {
      return Promise.resolve(mockAccount());
    }
  }
  return new LoadAccountByIdStub();
};
