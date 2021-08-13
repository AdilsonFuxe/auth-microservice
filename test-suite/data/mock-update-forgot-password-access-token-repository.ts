import { UpdateForgotPasswordAccessTokenRepository } from '@src/data/protocols';
import { AccountModel } from '@src/domain/models';
import { mockAccount } from '@test-suite/domain';

export const mockUdateForgotPasswordAccessTokenRepository =
  (): UpdateForgotPasswordAccessTokenRepository => {
    class UpdateForgotPasswordAccessTokenRepositoryStub
      implements UpdateForgotPasswordAccessTokenRepository
    {
      async updateForgotPasswordToken(): Promise<AccountModel> {
        return Promise.resolve(mockAccount());
      }
    }
    return new UpdateForgotPasswordAccessTokenRepositoryStub();
  };
