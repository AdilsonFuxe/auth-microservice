import { Controller } from '@src/presentation/protocols';

import { resetPasswordController } from '@src/presentation/controllers';
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
