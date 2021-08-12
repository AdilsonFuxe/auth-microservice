import { AccountModel } from '@src/domain/models';
import { LoadAccountById } from '@src/domain/usecases/load-account-by-id';
import { LoadAccountByIdlRepository } from '@src/data/protocols';

export class DbLoadAccountById implements LoadAccountById {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdlRepository
  ) {}

  async loadById(userId: string): Promise<AccountModel> {
    const account = await this.loadAccountByIdRepository.loadById(userId);
    return account;
  }
}
