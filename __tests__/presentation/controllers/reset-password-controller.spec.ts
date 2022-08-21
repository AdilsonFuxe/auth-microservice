import { resetPasswordController } from '@src/presentation/controllers';
import {
  InvalidAccessTokenError,
  MissingParamError,
  TokenExpiredError,
} from '@src/presentation/errors';
import {
  badRequest,
  noContent,
  notFoundError,
  serverError,
} from '@src/presentation/helpers/http';
import { HttpRequest } from '@src/presentation/protocols';
import { mockAccount } from '@test-suite/domain';
import {
  mockLoadAccountByEmail,
  mockUpdatePassword,
  mockValidation,
} from '@test-suite/presentation';

const makeSut = () => {
  const mockHttpRequest = (): HttpRequest => ({
    body: {
      email: 'any_email@mail.com',
      accessToken: 123456,
      password: 'new_password',
    },
  });

  const validation = jest.fn(mockValidation());
  const loadAccountByEmail = jest.fn(mockLoadAccountByEmail());
  const updatePassword = jest.fn(mockUpdatePassword());
  const sut = resetPasswordController({
    validation,
    loadAccountByEmail,
    updatePassword,
  });
  return {
    sut,
    validation,
    loadAccountByEmail,
    updatePassword,
    mockHttpRequest,
  };
};

describe('ResetPassword Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validation, mockHttpRequest } = makeSut();
    const httpRequest = mockHttpRequest();
    await sut(httpRequest);
    expect(validation).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validation, mockHttpRequest } = makeSut();
    validation.mockReturnValue(new MissingParamError('any_field'));
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field'))
    );
  });

  it('Should call LoadAccountByEmail with correct email', async () => {
    const { sut, loadAccountByEmail, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(loadAccountByEmail).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('Should return 404 if an invalid email is provided', async () => {
    const { sut, loadAccountByEmail, mockHttpRequest } = makeSut();
    loadAccountByEmail.mockResolvedValue(null);
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(notFoundError('email'));
  });

  it('Should return 400 if an invalid accessToken is provided', async () => {
    const { sut, loadAccountByEmail, mockHttpRequest } = makeSut();
    loadAccountByEmail.mockResolvedValue({
      ...mockAccount(),
      forgotPasswordAccessToken: 240998,
    });
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(badRequest(new InvalidAccessTokenError()));
  });

  it('Should return 400 if provided access token is expired', async () => {
    const { sut, loadAccountByEmail, mockHttpRequest } = makeSut();
    const date = new Date();
    date.setMinutes(date.getMinutes() - 10);
    loadAccountByEmail.mockResolvedValue({
      ...mockAccount(),
      forgotPasswordExpiresIn: date,
    });

    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(badRequest(new TokenExpiredError()));
  });

  it('Should return 500 if LoadAccountByEmail throws', async () => {
    const { sut, loadAccountByEmail, mockHttpRequest } = makeSut();
    loadAccountByEmail.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call UpdatePassword with correct values', async () => {
    const { sut, updatePassword, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(updatePassword).toHaveBeenCalledWith('valid_id', 'new_password');
  });

  it('Should return 500 if UpdatePassword throws', async () => {
    const { sut, updatePassword, mockHttpRequest } = makeSut();
    updatePassword.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 204 forgot password success', async () => {
    const { sut, mockHttpRequest } = makeSut();
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
