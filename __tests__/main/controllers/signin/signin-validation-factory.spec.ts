import { makeSignInValidation } from '@src/main/factories/controllers/signin/signin-validation-fatory';
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

describe('SignIn Validation Factory', () => {
  test('Should call validation composite with all validation', () => {
    makeSignInValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', makeEmailVaidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
