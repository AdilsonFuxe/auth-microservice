import { AccountModel } from '@src/domain/models';

export type LoadAccountByToken = (
  accessToken: string
) => LoadAccountByToken.Response;
export namespace LoadAccountByToken {
  export type Response = Promise<AccountModel>;
}
