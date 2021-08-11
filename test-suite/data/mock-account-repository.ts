import { AddAccountRepository } from '@/src/data/protocols';
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
