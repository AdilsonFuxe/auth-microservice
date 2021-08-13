import { MissingParamError } from '@src/presentation/errors';
import { RequiredFieldValidation } from '@src/validation/validators';

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation('field');

describe('RequiredField Validation', () => {
  it('Should returns a MissingParamError if Validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({
      name: 'any_name',
    });
    expect(error).toEqual(new MissingParamError('field'));
  });

  it('Should not returns if validation succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({
      field: 'any_name',
    });
    expect(error).toBeNull();
  });
});
