import { AccountModel } from '@/src/domain/models';
import { AddAccount } from '@/src/domain/usecases';
import { mockAccount } from '@/test-suite/domain';

export const mockAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(): Promise<AccountModel> {
      return Promise.resolve(mockAccount());
    }
  }
  return new AddAccountStub();
};
