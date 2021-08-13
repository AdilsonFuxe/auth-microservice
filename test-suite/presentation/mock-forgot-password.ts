import { ForgotPassword } from '@src/domain/usecases/forgot-password';

export const mockForgotPassword = (): ForgotPassword => {
  class ForgotPasswordStub implements ForgotPassword {
    async forgot(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new ForgotPasswordStub();
};
