import { AddAccount } from '@/src/domain/usecases';
import { SignUpController } from '@/src/presentation/controllers/signup-controller';
import {
  ContactInUseError,
  MissingParamError,
} from '@/src/presentation/errors';
import {
  badRequest,
  forbidden,
} from '@/src/presentation/helpers/http/http-helper';
import { HttpRequest, Validation } from '@/src/presentation/protocols';
import { mockValidationStub } from '@/test-suite/presentation';
import { mockAddAccountStub } from '@/test-suite/presentation/mock-add-account';

const mockHttpRequest = (): HttpRequest => ({
  body: {
    firstName: 'any_name',
    lastName: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

type SutTypes = {
  sut: SignUpController;
  validationStub: Validation;
  addAccountStub: AddAccount;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub();
  const addAccountStub = mockAddAccountStub();
  const sut = new SignUpController(validationStub, addAccountStub);
  return {
    sut,
    validationStub,
    addAccountStub,
  };
};

describe('SignUpController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = mockHttpRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResonse = await sut.handle(mockHttpRequest());
    expect(httpResonse).toEqual(badRequest(new MissingParamError('any_field')));
  });

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    await sut.handle(mockHttpRequest());
    expect(addSpy).toHaveBeenCalledWith({
      firstName: 'any_name',
      lastName: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 403 if addAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut();
    jest
      .spyOn(addAccountStub, 'add')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResonse = await sut.handle(mockHttpRequest());
    expect(httpResonse).toEqual(forbidden(new ContactInUseError()));
  });
});
