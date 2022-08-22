import { LoadAccountByToken } from '@src/domain/usecases';
import { Controller } from '@src/interface/protocols';

type Dependencies = {
  loadAccountByToken: LoadAccountByToken;
};

export type BuildAuthMiddleWare = (dependencies: Dependencies) => Controller;
