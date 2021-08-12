import { Decrypter } from '@src/data/protocols';
import { AccountModel } from '@src/domain/models';
import { LoadAccountByToken } from '@src/domain/usecases/load-account-by-token';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async loadByToken(accessToken: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken);
    return null;
  }
}
