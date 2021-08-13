import { Controller } from '@src/presentation/protocols';
import { ForgotPasswordController } from '@src/presentation/controllers/forgot-password-controller';
import { makeForgotPasswordValidation } from './forgot-password-validation-fatory';
import { makeDbLoadAccountByEmail } from '@src/main/factories/usecases/db-load-account-by-email';
import { makeDbForgotPassword } from '@src/main/factories/usecases/db-forgot-password';
import { makeRemoteSendMail } from '@src/main/factories/usecases/remote-send-mail-factory';

export const makeForgotPasswordController = (): Controller => {
  const controller = new ForgotPasswordController(
    makeForgotPasswordValidation(),
    makeDbLoadAccountByEmail(),
    makeDbForgotPassword(),
    makeRemoteSendMail()
  );
  return controller;
};
