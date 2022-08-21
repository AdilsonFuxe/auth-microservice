import { authMiddleware } from '@src/presentation/middlewares/auth-middleware';
import { Controller } from '@src/presentation/protocols';
import { makeDbLoadAccountByToken } from '@src/main/factories/usecases';

export const makeAuthMiddleware = (): Controller =>
  authMiddleware({
    loadAccountByToken: makeDbLoadAccountByToken(),
  });
