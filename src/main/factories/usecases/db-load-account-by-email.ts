import { DbLoadAccountByEmail } from '@src/data/usecases/db-load-account-by-email';
import { LoadAccountByEmail } from '@src/domain/usecases/load-account-by-email';
import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';

export const makeDbLoadAccountByEmail = (): LoadAccountByEmail => {
  const accountRepository = new AccountMongoRepository();
  return new DbLoadAccountByEmail(accountRepository);
};
