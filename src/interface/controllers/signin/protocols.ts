import { Authentication } from '@src/domain/usecases';
import { Controller, Validation } from '@src/interface/protocols';

type Dependencies = {
  validation: Validation;
  authentication: Authentication;
};

export type BuildSigninController = (dependencies: Dependencies) => Controller;
