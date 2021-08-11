import { AccountModel } from '@/src/domain/models';
import { AddAccount, AddAccountParams } from '@/src/domain/usecases';
import { AddAccountRepository } from '@/src/data/protocols';

export class DbAddAccount implements AddAccount {
  constructor(private readonly addAccountRepository: AddAccountRepository) {}
  async add(params: AddAccountParams): Promise<AccountModel> {
    const account = await this.addAccountRepository.add(params);
    return account;
  }
}
