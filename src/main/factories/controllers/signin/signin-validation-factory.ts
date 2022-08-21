import { emailValidatorAdapter } from '@src/infra/validators';
import { Validation } from '@src/presentation/protocols';
import {
  emailValidation,
  requiredFieldValidation,
  validationComposite,
} from '@src/validation/validators';

export const makeSignInValidation = (): Validation => {
  const validations: Validation[] = [];
  const requiredFields = ['email', 'password'];
  for (const field of requiredFields) {
    validations.push(requiredFieldValidation(field));
  }
  validations.push(emailValidation('email', emailValidatorAdapter));
  return validationComposite(validations);
};
