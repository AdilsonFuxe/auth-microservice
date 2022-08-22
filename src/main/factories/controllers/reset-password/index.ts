import { Controller } from '@src/interface/protocols';

import { resetPasswordController } from '@src/interface/controllers';
import { makeResetPasswordValidation } from './reset-password-validation-factory';
import {
  makeDbLoadAccountByEmail,
  makeDbUpdatePassword,
} from '@src/main/factories/usecases';

export const makeResetPasswordController = (): Controller =>
  resetPasswordController({
    validation: makeResetPasswordValidation(),
    loadAccountByEmail: makeDbLoadAccountByEmail(),
    updatePassword: makeDbUpdatePassword(),
  });
