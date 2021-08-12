import { AccountModel } from '@src/domain/models';

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>;
}
