import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';
import { UpdatePassword } from '@src/domain/usecases/update-password';
import { DbUpdatePassword } from '@src/data/usecases/db-update-password';

export const makeDbUpdatePassword = (): UpdatePassword => {
  const accountRepository = new AccountMongoRepository();
  return new DbUpdatePassword(accountRepository);
};
