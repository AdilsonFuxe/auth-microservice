import { AccountModel } from '@src/domain/models';

export interface LoadAccountById {
  loadById: (id: string) => Promise<AccountModel>;
}
