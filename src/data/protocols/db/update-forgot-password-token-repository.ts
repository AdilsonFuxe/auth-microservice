import { AccountModel } from '@src/domain/models';

export type UpdateForgotPasswordAccessTokenRepository = (
  id: string,
  params: UpdateForgotPasswordAccessTokenRepository.Params
) => UpdateForgotPasswordAccessTokenRepository.Response;

export namespace UpdateForgotPasswordAccessTokenRepository {
  export type Params = {
    accessToken: number;
    expiresIn: Date;
  };
  export type Response = Promise<AccountModel>;
}
