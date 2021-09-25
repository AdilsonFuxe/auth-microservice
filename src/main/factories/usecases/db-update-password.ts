import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';
import { UpdatePassword } from '@src/domain/usecases/update-password';
import { DbUpdatePassword } from '@src/data/usecases/db-update-password';
import { BcryptAdapter } from '@src/infra/cryptography';

export const makeDbUpdatePassword = (): UpdatePassword => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountRepository = new AccountMongoRepository();
  return new DbUpdatePassword(accountRepository, bcryptAdapter);
};
