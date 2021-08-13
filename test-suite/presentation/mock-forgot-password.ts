import {
  ForgotPassword,
  ForgotPasswordResponse,
} from '@src/domain/usecases/forgot-password';
import { mockForgotPasswordResponse } from '@test-suite/domain';

export const mockForgotPassword = (): ForgotPassword => {
  class ForgotPasswordStub implements ForgotPassword {
    async forgot(): Promise<ForgotPasswordResponse> {
      return Promise.resolve(mockForgotPasswordResponse());
    }
  }
  return new ForgotPasswordStub();
};
