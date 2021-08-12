import { AccountModel } from '@src/domain/models';

export interface LoadAccountByTokenRepository {
  loadByToken: (accessToken: string) => Promise<AccountModel>;
}
