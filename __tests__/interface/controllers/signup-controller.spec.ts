import { signupController } from '@src/interface/controllers';
import { ContactInUseError, MissingParamError } from '@src/interface/errors';
import { badRequest, created, serverError } from '@src/interface/helpers/http';
import { HttpRequest } from '@src/interface/protocols';
import {
  mockValidation,
  mockAuthentication,
  mockAddAccount,
} from '@test-suite/interface';
import { mockAccount } from '@test-suite/domain';

const makeSut = () => {
  const mockHttpRequest = (): HttpRequest => ({
    body: {
      firstName: 'any_name',
      lastName: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    },
  });

  const validation = jest.fn(mockValidation());
  const addAccount = jest.fn(mockAddAccount());
  const authentication = jest.fn(mockAuthentication());
  const loadAccountByEmail = jest.fn().mockResolvedValue(null);
  const sut = signupController({
    validation,
    addAccount,
    authentication,
    loadAccountByEmail,
  });
  return {
    sut,
    validation,
    addAccount,
    authentication,
    loadAccountByEmail,
    mockHttpRequest,
  };
};

describe('SignUpController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validation, mockHttpRequest } = makeSut();
    const httpRequest = mockHttpRequest();
    await sut(httpRequest);
    expect(validation).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validation, mockHttpRequest } = makeSut();
    validation.mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field'))
    );
  });

  it('Should call LoadAccountBYEmail with correct email', async () => {
    const { sut, loadAccountByEmail, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(loadAccountByEmail).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('Should return 400 if provided email is already in use', async () => {
    const { sut, loadAccountByEmail, mockHttpRequest } = makeSut();
    loadAccountByEmail.mockResolvedValue(mockAccount());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(badRequest(new ContactInUseError()));
  });

  it('Should return 500 if LoadAccountBYEmail throws', async () => {
    const { sut, loadAccountByEmail, mockHttpRequest } = makeSut();
    loadAccountByEmail.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccount, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(addAccount).toHaveBeenCalledWith({
      firstName: 'any_name',
      lastName: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccount, mockHttpRequest } = makeSut();
    addAccount.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call Authentication with correct values', async () => {
    const { sut, authentication, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(authentication).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authentication, mockHttpRequest } = makeSut();
    authentication.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 201 if valid data is provided', async () => {
    const { sut, mockHttpRequest } = makeSut();
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(created({ accessToken: 'any_access_token' }));
  });
});
