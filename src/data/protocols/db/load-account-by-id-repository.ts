import { AccountModel } from '@src/domain/models';

export interface LoadAccountByIdlRepository {
  loadById: (id: string) => Promise<AccountModel>;
}
