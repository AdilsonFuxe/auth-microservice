import { makeResetPasswordValidation } from '@src/main/factories/controllers/reset-password/reset-password-validation-fatory';
import { Validation } from '@src/presentation/protocols';
import { EmailValidator } from '@src/validation/protocols';
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@src/validation/validators';

jest.mock('@src/validation/validators/validation-composite');

const makeEmailVaidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('ResetPassword Validation Factory', () => {
  test('Should call validation composite with all validation', () => {
    makeResetPasswordValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password', 'accessToken']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', makeEmailVaidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
