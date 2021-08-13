import { ForgotPassword } from '@src/domain/usecases/forgot-password';
import { LoadAccountByEmail } from '@src/domain/usecases/load-account-by-email';
import { SendMail } from '@src/domain/usecases/send-mail';
import { ForgotPasswordController } from '@src/presentation/controllers/forgot-password-controller';
import { MissingParamError } from '@src/presentation/errors';
import {
  badRequest,
  noContent,
  notFounError,
  serverError,
} from '@src/presentation/helpers/http/http-helper';
import { HttpRequest, Validation } from '@src/presentation/protocols';
import { trhowError } from '@test-suite/helper';
import {
  mockForgotPassword,
  mockLoadAccountByEmail,
  mockSendMail,
  mockValidationStub,
} from '@test-suite/presentation';

const mockHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
  },
});

type SutTypes = {
  sut: ForgotPasswordController;
  validationStub: Validation;
  loadAccountByEmailStub: LoadAccountByEmail;
  forgotPasswordStub: ForgotPassword;
  senMailStub: SendMail;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub();
  const loadAccountByEmailStub = mockLoadAccountByEmail();
  const forgotPasswordStub = mockForgotPassword();
  const senMailStub = mockSendMail();
  const sut = new ForgotPasswordController(
    validationStub,
    loadAccountByEmailStub,
    forgotPasswordStub,
    senMailStub
  );
  return {
    sut,
    validationStub,
    loadAccountByEmailStub,
    forgotPasswordStub,
    senMailStub,
  };
};

describe('ForgotPassword Controller', () => {
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

  it('Should call LoadAccountBYEmail with correct email', async () => {
    const { sut, loadAccountByEmailStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailStub, 'loadByEmail');
    const httpRequest = mockHttpRequest();
    await sut.handle(httpRequest);
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('Should return 404 if an invalid email is provided', async () => {
    const { sut, loadAccountByEmailStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(notFounError('email'));
  });

  it('Should return 500 if LoadAccountBYEmail throws', async () => {
    const { sut, loadAccountByEmailStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailStub, 'loadByEmail')
      .mockImplementationOnce(trhowError);
    const httpResonse = await sut.handle(mockHttpRequest());
    expect(httpResonse).toEqual(serverError(new Error()));
  });

  it('Should call ForgotPassword with correct id', async () => {
    const { sut, forgotPasswordStub } = makeSut();
    const forgotSpy = jest.spyOn(forgotPasswordStub, 'forgot');
    const httpRequest = mockHttpRequest();
    await sut.handle(httpRequest);
    expect(forgotSpy).toHaveBeenCalledWith('valid_id');
  });

  it('Should return 500 if ForgotPassword throws', async () => {
    const { sut, forgotPasswordStub } = makeSut();
    jest.spyOn(forgotPasswordStub, 'forgot').mockImplementationOnce(trhowError);
    const httpResonse = await sut.handle(mockHttpRequest());
    expect(httpResonse).toEqual(serverError(new Error()));
  });

  it('Should call SendMail with correct values', async () => {
    const { sut, senMailStub } = makeSut();
    const sendMailSpy = jest.spyOn(senMailStub, 'sendMail');
    const httpRequest = mockHttpRequest();
    await sut.handle(httpRequest);
    expect(sendMailSpy).toHaveBeenCalledWith({
      to: 'any_email@mail.com',
      subject: 'Forgot password ✔',
      text: `Have you forgotten your password? no problem, use the token to change 123456`,
    });
  });

  it('Should return 500 if SendMail throws', async () => {
    const { sut, senMailStub } = makeSut();
    jest.spyOn(senMailStub, 'sendMail').mockImplementationOnce(trhowError);
    const httpResonse = await sut.handle(mockHttpRequest());
    expect(httpResonse).toEqual(serverError(new Error()));
  });

  it('Should return 204 forgot password success', async () => {
    const { sut } = makeSut();
    const httpResonse = await sut.handle(mockHttpRequest());
    expect(httpResonse).toEqual(noContent());
  });
});
