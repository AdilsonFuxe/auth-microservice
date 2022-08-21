import { Controller } from '@src/presentation/protocols';

import { forgotPasswordController } from '@src/presentation/controllers';
import { makeForgotPasswordValidation } from './forgot-password-validation-factory';
import {
  makeDbForgotPassword,
  makeDbLoadAccountByEmail,
  makeSendMail,
} from '@src/main/factories/usecases';

export const makeForgotPasswordController = (): Controller =>
  forgotPasswordController({
    validation: makeForgotPasswordValidation(),
    forgotPassword: makeDbForgotPassword(),
    loadAccountByEmail: makeDbLoadAccountByEmail(),
    sendMail: makeSendMail(),
  });
