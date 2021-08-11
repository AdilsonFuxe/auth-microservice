import { AccountModel } from '@/src/domain/models';
import { AddAccount, AddAccountParams } from '@/src/domain/usecases';
import {
  AddAccountRepository,
  Hasher,
  LoadAccountByEmailRepository,
} from '@/src/data/protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher
  ) {}
  async add(params: AddAccountParams): Promise<AccountModel> {
    const result = await this.loadAccountByEmailRepository.loadByEmail(
      params.email
    );
    const hashed_password = await this.hasher.hash(params.password);
    if (result) {
      return null;
    }
    const account = await this.addAccountRepository.add(params);
    return account;
  }
}
