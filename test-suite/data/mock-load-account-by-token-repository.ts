import { LoadAccountByTokenRepository } from '@src/data/protocols';
import { AccountModel } from '@src/domain/models';
import { mockAccount } from '@test-suite/domain';

export const mockLoadAccountByTokenRepository =
  (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub
      implements LoadAccountByTokenRepository
    {
      async loadByToken(accessToken: string): Promise<AccountModel> {
        return Promise.resolve(mockAccount());
      }
    }
    return new LoadAccountByTokenRepositoryStub();
  };
