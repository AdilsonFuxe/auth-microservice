import { LoadAccountByEmail } from '@src/domain/usecases/load-account-by-email';
import { UpdatePassword } from '@src/domain/usecases/update-password';
import { ResetPasswordController } from '@src/presentation/controllers/reset-password-controller';
import {
  InvalidAccessTokenError,
  MissingParamError,
  TokenExpiredError,
} from '@src/presentation/errors';
import {
  badRequest,
  notFounError,
  serverError,
} from '@src/presentation/helpers/http/http-helper';
import { HttpRequest, Validation } from '@src/presentation/protocols';
import { mockAccount } from '@test-suite/domain';
import { trhowError } from '@test-suite/helper';
import {
  mockLoadAccountByEmail,
  mockUpdatePassword,
  mockValidationStub,
} from '@test-suite/presentation';

const mockHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    accessToken: 123456,
    password: 'new_password',
  },
});

type SutTypes = {
  sut: ResetPasswordController;
  validationStub: Validation;
  loadAccountByEmailStub: LoadAccountByEmail;
  updatePasswordStub: UpdatePassword;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub();
  const loadAccountByEmailStub = mockLoadAccountByEmail();
  const updatePasswordStub = mockUpdatePassword();
  const sut = new ResetPasswordController(
    validationStub,
    loadAccountByEmailStub,
    updatePasswordStub
  );
  return {
    sut,
    validationStub,
    loadAccountByEmailStub,
    updatePasswordStub,
  };
};

describe('ReserPassword Controller', () => {
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

  it('Should call LoadAccountByEmail with correct email', async () => {
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

  it('Should return 400 if an invalid accessToken is provided', async () => {
    const { sut, loadAccountByEmailStub } = makeSut();
    const { forgotPasswordAccessToken, ...accountWithoutAccessToken } =
      mockAccount();
    jest.spyOn(loadAccountByEmailStub, 'loadByEmail').mockReturnValueOnce(
      Promise.resolve({
        forgotPasswordAccessToken: 240998,
        ...accountWithoutAccessToken,
      })
    );
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(badRequest(new InvalidAccessTokenError()));
  });

  it('Should return 400 if provided access token is expired', async () => {
    const { sut, loadAccountByEmailStub } = makeSut();
    const { forgotPasswordExpiresIn, ...accountWithoutExpiresIn } =
      mockAccount();

    const date = new Date();
    date.setMinutes(date.getMinutes() - 10);

    mockAccount();
    jest.spyOn(loadAccountByEmailStub, 'loadByEmail').mockReturnValueOnce(
      Promise.resolve({
        forgotPasswordExpiresIn: date,
        ...accountWithoutExpiresIn,
      })
    );
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(badRequest(new TokenExpiredError()));
  });

  it('Should return 500 if LoadAccountBYEmail throws', async () => {
    const { sut, loadAccountByEmailStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailStub, 'loadByEmail')
      .mockImplementationOnce(trhowError);
    const httpResonse = await sut.handle(mockHttpRequest());
    expect(httpResonse).toEqual(serverError(new Error()));
  });

  it('Should call UpdatePassword with correct values', async () => {
    const { sut, updatePasswordStub } = makeSut();
    const updatePasswordSpy = jest.spyOn(updatePasswordStub, 'updatePasseword');
    const httpRequest = mockHttpRequest();
    await sut.handle(httpRequest);
    expect(updatePasswordSpy).toHaveBeenCalledWith('valid_id', 'new_password');
  });
});
