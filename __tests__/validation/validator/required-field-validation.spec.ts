import { MissingParamError } from '@/src/presentation/errors';
import { RequiredFieldValidation } from '@/src/validation/validators';

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation('field');

describe('RequiredField Validation', () => {
  test('Should returns a MissingParamError if Validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({
      name: 'any_name',
    });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
