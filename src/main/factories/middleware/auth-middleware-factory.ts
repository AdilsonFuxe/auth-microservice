import { Middleware } from '@src/presentation/protocols';
import { AuthMiddleware } from '@src/presentation/middlewares/auth-middleware';
import { makeDbLoadAccountByToken } from '@src/main/factories/usecases/db-load-account-by-token';

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken());
};
