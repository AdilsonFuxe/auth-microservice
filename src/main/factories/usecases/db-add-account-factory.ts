import { DbAddAccount } from '@/src/data/usecases/db-add-account';
import { AddAccount } from '@/src/domain/usecases';
import { BcryptAdapter } from '@/src/infra/cryptography';
import { AccountMongoRepository } from '@/src/infra/db/mongoose/repositories';

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountRepository = new AccountMongoRepository();
  return new DbAddAccount(accountRepository, accountRepository, bcryptAdapter);
};
