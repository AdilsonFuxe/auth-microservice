import { InvalidParamError } from '@src/presentation/errors';
import { emailValidation } from '@src/validation/validators/email-validation';
import { mockEmailValidator } from '@test-suite/validation';

const makeSut = () => {
  const emailValidator = jest.fn(mockEmailValidator());
  const sut = emailValidation('email', emailValidator);

  return {
    sut,
    emailValidator,
  };
};

describe('EmailValidation', () => {
  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidator } = makeSut();
    sut({ email: 'any_email@mail.com' });
    expect(emailValidator).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('Should return an error if EmailValidator returns false', async () => {
    const { sut, emailValidator } = makeSut();
    emailValidator.mockReturnValueOnce(false);
    const result = sut({ email: 'invalid_email' });
    expect(result).toEqual(new InvalidParamError('email'));
  });

  it('Should return null if EmailValidator returns true', async () => {
    const { sut } = makeSut();
    const result = sut({ email: 'any_email@mail.com' });
    expect(result).toBeNull();
  });
});
