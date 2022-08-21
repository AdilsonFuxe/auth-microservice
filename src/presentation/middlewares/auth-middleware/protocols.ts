import { LoadAccountByToken } from '@src/domain/usecases';
import { Controller } from '@src/presentation/protocols';

type Dependencies = {
  loadAccountByToken: LoadAccountByToken;
};

export type BuildAuthMiddleWare = (dependencies: Dependencies) => Controller;
