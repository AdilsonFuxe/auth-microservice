import env from '@/src/main/config/env';
import { Authentication } from '@/src/domain/usecases';
import { BcryptAdapter } from '@/src/infra/cryptography';
import { AccountMongoRepository } from '@/src/infra/db/mongoose/repositories';
import { DbAuthentication } from '@/src/data/usecases/db-authentication';
import { JwtAdapter } from '@/src/infra/cryptography/jwt-adapter';

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const accountRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  return new DbAuthentication(
    accountRepository,
    bcryptAdapter,
    jwtAdapter,
    accountRepository
  );
};
