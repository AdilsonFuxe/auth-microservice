import { emailValidatorAdapter } from '@src/infra/validators';
import { Validation } from '@src/presentation/protocols';
import {
  compareFieldValidation,
  emailValidation,
  requiredFieldValidation,
  validationComposite,
} from '@src/validation/validators';

export const makeSignupValidation = (): Validation => {
  const validations: Validation[] = [];
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'password',
    'passwordConfirmation',
  ];
  for (const field of requiredFields) {
    validations.push(requiredFieldValidation(field));
  }
  validations.push(compareFieldValidation('password', 'passwordConfirmation'));
  validations.push(emailValidation('email', emailValidatorAdapter));
  return validationComposite(validations);
};
