import { SignInController } from '@src/presentation/controllers/signin-controller';
import { Controller } from '@src/presentation/protocols';
import { makeDbAuthentication } from '@src/main/factories/usecases/db-authenticationr-factory';
import { makeSignInValidation } from './signin-validation-fatory';

export const makeSignInController = (): Controller => {
  const controller = new SignInController(
    makeSignInValidation(),
    makeDbAuthentication()
  );
  return controller;
};
