import { AddAccount, Authentication } from '@src/domain/usecases';
import { SignUpController } from '@src/presentation/controllers/signup-controller';
import { ContactInUseError, MissingParamError } from '@src/presentation/errors';
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from '@src/presentation/helpers/http/http-helper';
import { HttpRequest, Validation } from '@src/presentation/protocols';
import { trhowError } from '@test-suite/helper';
import {
  mockValidationStub,
  mockAuthenticationStub,
  mockAddAccountStub,
} from '@test-suite/presentation';

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
  authenticationStub: Authentication;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub();
  const addAccountStub = mockAddAccountStub();
  const authenticationStub = mockAuthenticationStub();
  const sut = new SignUpController(
    validationStub,
    addAccountStub,
    authenticationStub
  );
  return {
    sut,
    validationStub,
    addAccountStub,
    authenticationStub,
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

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(trhowError);
    const httpResonse = await sut.handle(mockHttpRequest());
    expect(httpResonse).toEqual(serverError(new Error()));
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(mockHttpRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'valid_email',
      password: 'valid_password',
    });
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(trhowError);
    const httpResonse = await sut.handle(mockHttpRequest());
    expect(httpResonse).toEqual(serverError(new Error()));
  });

  test('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResonse = await sut.handle(mockHttpRequest());
    expect(httpResonse).toEqual(ok({ accessToken: 'any_access_token' }));
  });
});
