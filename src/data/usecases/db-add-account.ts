import { AccountModel } from '@/src/domain/models';
import { AddAccount, AddAccountParams } from '@/src/domain/usecases';
import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
} from '@/src/data/protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}
  async add(params: AddAccountParams): Promise<AccountModel> {
    const result = await this.loadAccountByEmailRepository.loadByEmail(
      params.email
    );
    if (result) {
      return null;
    }
    const account = await this.addAccountRepository.add(params);
    return account;
  }
}
