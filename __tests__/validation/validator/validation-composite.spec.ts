import { MissingParamError } from '@src/presentation/errors';
import { Validation } from '@src/presentation/protocols';
import { ValidationComposite } from '@src/validation/validators';
import { mockValidation } from '@test-suite/validation';

type SutTypes = {
  sut: ValidationComposite;
  validationStubs: Validation[];
};

const makeSut = (): SutTypes => {
  const validationStubs = [mockValidation(), mockValidation()];
  const sut = new ValidationComposite(validationStubs);

  return {
    sut,
    validationStubs,
  };
};

describe('Validation Composite', () => {
  it('Should return an error if an validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({
      field: 'any_value',
    });
    expect(error).toEqual(new MissingParamError('field'));
  });

  it('Should return the first if more the one validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error());
    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({
      field: 'any_value',
    });
    expect(error).toEqual(new Error());
  });

  it('Should not return if validation succeeds', () => {
    const { sut } = makeSut();
    const error = sut.validate({
      field: 'any_value',
    });
    expect(error).toBeFalsy();
  });
});
