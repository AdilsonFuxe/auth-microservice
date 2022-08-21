import { MissingParamError } from '@src/presentation/errors';
import { requiredFieldValidation } from '@src/validation/validators';

const makeSut = () => requiredFieldValidation('field');

describe('RequiredField Validation', () => {
  it('Should returns a MissingParamError if Validation fails', () => {
    const sut = makeSut();
    const error = sut({
      name: 'any_name',
    });
    expect(error).toEqual(new MissingParamError('field'));
  });

  it('Should not returns if validation succeeds', () => {
    const sut = makeSut();
    const error = sut({
      field: 'any_name',
    });
    expect(error).toBeNull();
  });
});
