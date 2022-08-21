import { makeSignInValidation } from '@src/main/factories/controllers/signin/signin-validation-factory';
import { validationComposite } from '@src/validation/validators';

jest.mock('@src/validation/validators/validation-composite');

describe('SignIn Validation Factory', () => {
  test('Should call validation composite with all validation', () => {
    makeSignInValidation();
    expect(validationComposite).toHaveBeenCalled();
  });
});
