import { MissingParamError } from '@src/interface/errors';
import { validationComposite } from '@src/validation/validators';
import { mockValidation } from '@test-suite/validation';

const makeSut = () => {
  const validations = [jest.fn(mockValidation()), jest.fn(mockValidation())];
  const sut = validationComposite(validations);

  return {
    sut,
    validations,
  };
};

describe('Validation Composite', () => {
  it('Should return an error if an validation fails', () => {
    const { sut, validations } = makeSut();
    validations[1].mockReturnValueOnce(new MissingParamError('field'));
    const error = sut({
      field: 'any_value',
    });
    expect(error).toEqual(new MissingParamError('field'));
  });

  it('Should return the first if more the one validation fails', () => {
    const { sut, validations } = makeSut();
    validations[0].mockReturnValueOnce(new Error());
    validations[1].mockReturnValueOnce(new MissingParamError('field'));
    const error = sut({
      field: 'any_value',
    });
    expect(error).toEqual(new Error());
  });

  it('Should not return if validation succeeds', () => {
    const { sut } = makeSut();
    const error = sut({
      field: 'any_value',
    });
    expect(error).toBeFalsy();
  });
});
