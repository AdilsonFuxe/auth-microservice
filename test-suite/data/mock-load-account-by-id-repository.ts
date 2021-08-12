import { LoadAccountByIdlRepository } from '@src/data/protocols';
import { AccountModel } from '@src/domain/models';
import { mockAccount } from '@test-suite/domain';

export const mockLoadAccountByIdRepository = (): LoadAccountByIdlRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdlRepository {
    async loadById(): Promise<AccountModel> {
      return Promise.resolve(mockAccount());
    }
  }
  return new LoadAccountByIdRepositoryStub();
};
