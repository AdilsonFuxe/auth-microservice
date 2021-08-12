import { AccountModel } from '@src/domain/models';

export interface LoadAccountByToken {
  loadByToken: (accessToken: string) => Promise<AccountModel>;
}
