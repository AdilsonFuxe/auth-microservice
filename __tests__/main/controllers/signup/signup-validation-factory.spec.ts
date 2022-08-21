import { makeSignupValidation } from '@src/main/factories/controllers/signup/signup-validation-factory';
import { validationComposite } from '@src/validation/validators';

jest.mock('@src/validation/validators/validation-composite');

describe('Signup Validation Factory', () => {
  test('Should call validation composite with all validation', () => {
    makeSignupValidation();
    expect(validationComposite).toHaveBeenCalled();
  });
});
