import { makeResetPasswordValidation } from '@src/main/factories/controllers/reset-password/reset-password-validation-factory';
import { validationComposite } from '@src/validation/validators';

jest.mock('@src/validation/validators/validation-composite');

describe('ResetPassword Validation Factory', () => {
  test('Should call validation composite with all validation', () => {
    makeResetPasswordValidation();
    expect(validationComposite).toHaveBeenCalled();
  });
});
