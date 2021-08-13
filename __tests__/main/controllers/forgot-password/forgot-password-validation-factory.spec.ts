import { makeForgotPasswordValidation } from '@src/main/factories/controllers/forgot-password/forgot-password-validation-fatory';
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

describe('Forgot Password Validation Factory', () => {
  test('Should call validation composite with all validation', () => {
    makeForgotPasswordValidation();
    const validations: Validation[] = [
      new RequiredFieldValidation('email'),
      new EmailValidation('email', makeEmailVaidator()),
    ];
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
