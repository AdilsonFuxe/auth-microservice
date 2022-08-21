import { meController } from '@src/presentation/controllers';
import { Controller } from '@src/presentation/protocols';
import { makeDbLoadAccountById } from '@src/main/factories/usecases';

export const makeMeController = (): Controller =>
  meController({
    loadAccountById: makeDbLoadAccountById(),
  });
