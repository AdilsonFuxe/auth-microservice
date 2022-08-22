import { signinController } from '@src/interface/controllers';
import { Controller } from '@src/interface/protocols';
import { makeDbAuthentication } from '@src/main/factories/usecases';
import { makeSignInValidation } from './signin-validation-factory';

export const makeSignInController = (): Controller =>
  signinController({
    authentication: makeDbAuthentication(),
    validation: makeSignInValidation(),
  });
