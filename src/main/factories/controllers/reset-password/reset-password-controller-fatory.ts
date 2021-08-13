import { Controller } from '@src/presentation/protocols';
import { ResetPasswordController } from '@src/presentation/controllers/reset-password-controller';
import { makeResetPasswordValidation } from './reset-password-validation-fatory';
import { makeDbLoadAccountByEmail } from '../../usecases/db-load-account-by-email';
import { makeDbUpdatePassword } from '../../usecases/db-update-password';

export const makeResetPasswordController = (): Controller => {
  const controller = new ResetPasswordController(
    makeResetPasswordValidation(),
    makeDbLoadAccountByEmail(),
    makeDbUpdatePassword()
  );
  return controller;
};
