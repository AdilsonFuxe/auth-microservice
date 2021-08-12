import { MeController } from '@src/presentation/controllers/me-controller';
import { Controller } from '@src/presentation/protocols';
import { makeDbLoadAccountById } from '../../usecases/db-load-account-by-id';

export const makeMeController = (): Controller => {
  const controller = new MeController(makeDbLoadAccountById());
  return controller;
};
