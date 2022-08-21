import { signinController } from '@src/presentation/controllers';
import { Controller } from '@src/presentation/protocols';
import { makeDbAuthentication } from '@src/main/factories/usecases';
import { makeSignInValidation } from './signin-validation-factory';

export const makeSignInController = (): Controller =>
  signinController({
    authentication: makeDbAuthentication(),
    validation: makeSignInValidation(),
  });
