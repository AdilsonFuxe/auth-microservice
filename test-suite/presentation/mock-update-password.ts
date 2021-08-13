import { UpdatePassword } from '@src/domain/usecases/update-password';

export const mockUpdatePassword = (): UpdatePassword => {
  class UpdatePasswordStub implements UpdatePassword {
    async updatePasseword(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new UpdatePasswordStub();
};
