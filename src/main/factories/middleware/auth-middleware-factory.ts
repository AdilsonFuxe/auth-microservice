import { authMiddleware } from '@src/interface/middlewares/auth-middleware';
import { Controller } from '@src/interface/protocols';
import { makeDbLoadAccountByToken } from '@src/main/factories/usecases';

export const makeAuthMiddleware = (): Controller =>
  authMiddleware({
    loadAccountByToken: makeDbLoadAccountByToken(),
  });
