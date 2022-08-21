import { forgotPasswordController } from '@src/presentation/controllers';
import { MissingParamError } from '@src/presentation/errors';
import {
  badRequest,
  noContent,
  notFoundError,
  serverError,
} from '@src/presentation/helpers/http';
import { HttpRequest } from '@src/presentation/protocols';
import {
  mockForgotPassword,
  mockLoadAccountByEmail,
  mockSendMail,
  mockValidation,
} from '@test-suite/presentation';

const makeSut = () => {
  const mockHttpRequest = (): HttpRequest => ({
    body: {
      email: 'any_email@mail.com',
    },
  });
  const validation = jest.fn(mockValidation());
  const loadAccountByEmail = jest.fn(mockLoadAccountByEmail());
  const forgotPassword = jest.fn(mockForgotPassword());
  const sendMail = jest.fn(mockSendMail());
  const sut = forgotPasswordController({
    forgotPassword,
    loadAccountByEmail,
    sendMail,
    validation,
  });
  return {
    mockHttpRequest,
    sut,
    forgotPassword,
    loadAccountByEmail,
    sendMail,
    validation,
  };
};

describe('ForgotPassword Controller', () => {
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

  it('Should call LoadAccountBYEmail with correct email', async () => {
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

  it('Should return 500 if LoadAccountBYEmail throws', async () => {
    const { sut, loadAccountByEmail, mockHttpRequest } = makeSut();
    loadAccountByEmail.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call ForgotPassword with correct id', async () => {
    const { sut, forgotPassword, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(forgotPassword).toHaveBeenCalledWith('valid_id');
  });

  it('Should return 500 if ForgotPassword throws', async () => {
    const { sut, forgotPassword, mockHttpRequest } = makeSut();
    forgotPassword.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call SendMail with correct values', async () => {
    const { sut, sendMail, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(sendMail).toHaveBeenCalledWith({
      to: 'any_email@mail.com',
      subject: 'Forgot password ✔',
      text: `Have you forgotten your password? no problem, use the token to change 123456`,
    });
  });

  it('Should return 500 if SendMail throws', async () => {
    const { sut, sendMail, mockHttpRequest } = makeSut();
    sendMail.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 204 forgot password success', async () => {
    const { sut, mockHttpRequest } = makeSut();
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
