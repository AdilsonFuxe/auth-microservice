import { EmailValidatorAdapter } from '@src/infra/validators/email-validator-adapter';
import { Validation } from '@src/presentation/protocols';
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@src/validation/validators';

export const makeForgotPasswordValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    new RequiredFieldValidation('email'),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ];
  return new ValidationComposite(validations);
};
