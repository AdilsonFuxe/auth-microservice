import { LoadAccountByEmailRepository } from '@src/data/protocols';
import { AccountModel } from '@src/domain/models';
import { mockAccount } from '@test-suite/domain';

export const mockLoadAccountByEmailRepositoryStub =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      async loadByEmail(): Promise<AccountModel> {
        return Promise.resolve(mockAccount());
      }
    }
    return new LoadAccountByEmailRepositoryStub();
  };
