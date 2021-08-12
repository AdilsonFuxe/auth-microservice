import { EmailValidatorAdapter } from '@/src/infra/validators/email-validator-adapter';
import { Validation } from '@/src/presentation/protocols';
import {
  CompareFieldValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/src/validation/validators';

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'password',
    'passwordConfirmation',
  ];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(
    new CompareFieldValidation('password', 'passwordConfirmation')
  );
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
