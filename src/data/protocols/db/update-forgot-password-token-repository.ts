import { AccountModel } from '@src/domain/models';

export type UpdateForgotPasswordAccessTokenParams = {
  accessToken: number;
  expiresIn: Date;
};

export interface UpdateForgotPasswordAccessTokenRepository {
  updateForgotPasswordToken: (
    id: string,
    params: UpdateForgotPasswordAccessTokenParams
  ) => Promise<AccountModel>;
}
