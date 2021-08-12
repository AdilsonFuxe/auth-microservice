import { makeSignupValidation } from '@/src/main/factories/controllers/signup/signup-validation-fatory';
import { Validation } from '@/src/presentation/protocols';
import { EmailValidator } from '@/src/validation/protocols';
import {
  CompareFieldValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/src/validation/validators';

jest.mock('@/src/validation/validators/validation-composite');

const makeEmailVaidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('Signup Validation Factory', () => {
  test('Should call validation composite with all validation', () => {
    makeSignupValidation();
    const validations: Validation[] = [];
    for (const field of [
      'firstName',
      'lastName',
      'email',
      'password',
      'passwordConfirmation',
    ]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldValidation('password', 'passwordConfirmation')
    );
    validations.push(new EmailValidation('email', makeEmailVaidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
