import { SignUpController } from '@src/presentation/controllers/signup-controller';
import { Controller } from '@src/presentation/protocols';
import { makeDbAddAccount } from '@src/main/factories/usecases/db-add-account-factory';
import { makeDbAuthentication } from '@src/main/factories/usecases/db-authenticationr-factory';
import { makeSignupValidation } from './signup-validation-fatory';

export const makeSignupController = (): Controller => {
  const controller = new SignUpController(
    makeSignupValidation(),
    makeDbAddAccount(),
    makeDbAuthentication()
  );
  return controller;
};
