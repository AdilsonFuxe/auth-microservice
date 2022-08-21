import { LoadAccountById } from '@src/domain/usecases';
import { Controller } from '@src/presentation/protocols';

type Dependencies = {
  loadAccountById: LoadAccountById;
};

export type BuildMeController = (dependencies: Dependencies) => Controller;
