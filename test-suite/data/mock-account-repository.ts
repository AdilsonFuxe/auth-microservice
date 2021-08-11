import {
  AddAccountRepository,
  UpdateAcessTokenRepository,
} from '@/src/data/protocols';
import { AccountModel } from '@/src/domain/models';
import { mockAccount } from '../domain';

export const mockAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(): Promise<AccountModel> {
      return Promise.resolve(mockAccount());
    }
  }
  return new AddAccountRepositoryStub();
};

export const mockUpdateAccessTokenRepository =
  (): UpdateAcessTokenRepository => {
    class UpdateAcessTokenRepositoryStub implements UpdateAcessTokenRepository {
      async updateAcessToken(): Promise<void> {
        return Promise.resolve();
      }
    }

    return new UpdateAcessTokenRepositoryStub();
  };
