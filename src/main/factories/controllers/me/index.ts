import { meController } from '@src/interface/controllers';
import { Controller } from '@src/interface/protocols';
import { makeDbLoadAccountById } from '@src/main/factories/usecases';

export const makeMeController = (): Controller =>
  meController({
    loadAccountById: makeDbLoadAccountById(),
  });
