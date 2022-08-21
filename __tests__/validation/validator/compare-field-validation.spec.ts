import { InvalidParamError } from '@src/presentation/errors';
import { compareFieldValidation } from '@src/validation/validators';

const makeSut = () =>
  compareFieldValidation('password', 'passwordConfirmation');

describe('CompareFieldValidation', () => {
  it('Should returns a InvalidParamError if Validation fails', () => {
    const sut = makeSut();
    const error = sut({
      password: '12354',
      passwordConfirmation: '12345',
    });
    expect(error).toEqual(new InvalidParamError('passwordConfirmation'));
  });

  it('Should not returns if validation succeeds', () => {
    const sut = makeSut();
    const error = sut({
      password: '12354',
      passwordConfirmation: '12354',
    });
    expect(error).toBeNull();
  });
});
