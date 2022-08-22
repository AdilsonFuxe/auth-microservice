import { LoadAccountByEmail, UpdatePassword } from '@src/domain/usecases';
import { Controller, Validation } from '@src/interface/protocols';

type Dependencies = {
  validation: Validation;
  loadAccountByEmail: LoadAccountByEmail;
  updatePassword: UpdatePassword;
};

export type BuildResetPasswordController = (
  dependencies: Dependencies
) => Controller;
