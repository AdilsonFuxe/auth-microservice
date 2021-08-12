import { AccountModel } from '@src/domain/models';

export interface LoadAccountByEmail {
  loadByEmail: (email: string) => Promise<AccountModel>;
}
