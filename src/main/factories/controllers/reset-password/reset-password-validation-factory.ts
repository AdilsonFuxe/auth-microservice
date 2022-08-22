import { emailValidatorAdapter } from '@src/infra/validators';
import { Validation } from '@src/interface/protocols';
import {
  emailValidation,
  requiredFieldValidation,
  validationComposite,
} from '@src/validation/validators';

export const makeResetPasswordValidation = (): Validation => {
  const validations: Validation[] = [];
  const requiredFields = ['email', 'password', 'accessToken'];
  for (const field of requiredFields) {
    validations.push(requiredFieldValidation(field));
  }
  validations.push(emailValidation('email', emailValidatorAdapter));
  return validationComposite(validations);
};
