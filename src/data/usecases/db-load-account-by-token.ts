import { Decrypter, LoadAccountByTokenRepository } from '@src/data/protocols';
import { AccountModel } from '@src/domain/models';
import { LoadAccountByToken } from '@src/domain/usecases/load-account-by-token';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async loadByToken(accessToken: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken);
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(
        accessToken
      );
      if (account) {
        return account;
      }
    }
    return null;
  }
}
