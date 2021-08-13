import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';
import { ForgotPassword } from '@src/domain/usecases/forgot-password';
import { DbForgotPassword } from '@src/data/usecases/db-forgot-password';
import { GenerateAccessTokenAdapter } from '@src/infra/cryptography';

export const makeDbForgotPassword = (): ForgotPassword => {
  const accountRepository = new AccountMongoRepository();
  const generateAccessTokenAdapter = new GenerateAccessTokenAdapter();
  return new DbForgotPassword(generateAccessTokenAdapter, accountRepository);
};
