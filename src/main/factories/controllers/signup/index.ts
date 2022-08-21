import { signupController } from '@src/presentation/controllers';
import { Controller } from '@src/presentation/protocols';
import {
  makeDbAddAccount,
  makeDbAuthentication,
  makeDbLoadAccountByEmail,
} from '@src/main/factories/usecases';
import { makeSignupValidation } from './signup-validation-factory';

export const makeSignupController = (): Controller =>
  signupController({
    validation: makeSignupValidation(),
    addAccount: makeDbAddAccount(),
    authentication: makeDbAuthentication(),
    loadAccountByEmail: makeDbLoadAccountByEmail(),
  });
