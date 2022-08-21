import { makeForgotPasswordValidation } from '@src/main/factories/controllers/forgot-password/forgot-password-validation-factory';
import { validationComposite } from '@src/validation/validators';

jest.mock('@src/validation/validators/validation-composite');

describe('Forgot Password Validation Factory', () => {
  it('Should call validation composite with all validation', () => {
    makeForgotPasswordValidation();
    expect(validationComposite).toHaveBeenCalled();
  });
});
