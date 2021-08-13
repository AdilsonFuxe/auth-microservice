import { UpdatePasswordRepository } from '@src/data/protocols';
import { AccountModel } from '@src/domain/models';
import { mockAccount } from '@test-suite/domain';

export const mockUpdatePasswordRepository = (): UpdatePasswordRepository => {
  class UpdatePasswordRepositoryStub implements UpdatePasswordRepository {
    async updatePassword(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new UpdatePasswordRepositoryStub();
};
