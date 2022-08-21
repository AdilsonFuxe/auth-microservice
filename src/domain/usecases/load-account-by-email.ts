import { AccountModel } from '@src/domain/models';

export type LoadAccountByEmail = (email: string) => LoadAccountByEmail.Response;

export namespace LoadAccountByEmail {
  export type Response = Promise<AccountModel>;
}
