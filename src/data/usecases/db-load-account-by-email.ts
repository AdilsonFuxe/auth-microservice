import { AccountModel } from '@src/domain/models';
import { LoadAccountByEmail } from '@src/domain/usecases/load-account-by-email';
import { LoadAccountByEmailRepository } from '@src/data/protocols';

export class DbLoadAccountByEmail implements LoadAccountByEmail {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async loadByEmail(email: string): Promise<AccountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(email);
    return null;
  }
}
