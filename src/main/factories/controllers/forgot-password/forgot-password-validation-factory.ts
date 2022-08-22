import { emailValidatorAdapter } from '@src/infra/validators/email-validator-adapter';
import { Validation } from '@src/interface/protocols';
import {
  emailValidation,
  requiredFieldValidation,
  validationComposite,
} from '@src/validation/validators';

export const makeForgotPasswordValidation = (): Validation => {
  const validations: Validation[] = [
    requiredFieldValidation('email'),
    emailValidation('email', emailValidatorAdapter),
  ];
  return validationComposite(validations);
};
