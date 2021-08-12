import { DbLoadAccountByToken } from '@src/data/usecases/db-load-account-by-token';
import { LoadAccountByToken } from '@src/domain/usecases/load-account-by-token';
import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter';
import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';
import env from '@src/main/config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountRepository);
};
