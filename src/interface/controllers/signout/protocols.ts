import { Signout } from '@src/domain/usecases';
import { Controller } from '@src/interface/protocols';

type Dependencies = {
  signout: Signout;
};

export type BuildSignoutController = (dependencies: Dependencies) => Controller;
