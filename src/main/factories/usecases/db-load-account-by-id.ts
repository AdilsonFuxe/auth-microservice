import { DbLoadAccountById } from '@src/data/usecases/db-load-accout-by-id';
import { LoadAccountById } from '@src/domain/usecases/load-account-by-id';
import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';

export const makeDbLoadAccountById = (): LoadAccountById => {
  const accountRepository = new AccountMongoRepository();
  return new DbLoadAccountById(accountRepository);
};
