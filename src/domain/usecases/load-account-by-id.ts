import { AccountModel } from '@src/domain/models';

export type LoadAccountById = (id: string) => LoadAccountById.Response;

export namespace LoadAccountById {
  export type Response = Promise<AccountModel>;
}
