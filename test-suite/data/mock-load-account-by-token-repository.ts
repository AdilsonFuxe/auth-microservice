import { UpdateForgotPasswordAccessTokenRepository } from '@src/data/protocols';

export const mockUdateForgotPasswordAccessTokenRepository =
  (): UpdateForgotPasswordAccessTokenRepository => {
    class UpdateForgotPasswordAccessTokenRepositoryStub
      implements UpdateForgotPasswordAccessTokenRepository
    {
      async updateForgotPasswordToken(): Promise<void> {}
    }
    return new UpdateForgotPasswordAccessTokenRepositoryStub();
  };
