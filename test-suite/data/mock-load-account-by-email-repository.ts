import { LoadAccountByEmailRepository } from '@/src/data/protocols';
import { AccountModel } from '@/src/domain/models';
import { mockAccount } from '../domain';

export const mockLoadAccountByEmailRepositoryStub =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      async loadByEmail(): Promise<AccountModel> {
        return Promise.resolve(null);
      }
    }
    return new LoadAccountByEmailRepositoryStub();
  };
