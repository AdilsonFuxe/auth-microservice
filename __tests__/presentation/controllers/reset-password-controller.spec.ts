import { LoadAccountByEmail } from '@src/domain/usecases/load-account-by-email';
import { ResetPasswordController } from '@src/presentation/controllers/reset-password-controller';
import { MissingParamError } from '@src/presentation/errors';
import { badRequest } from '@src/presentation/helpers/http/http-helper';
import { HttpRequest, Validation } from '@src/presentation/protocols';
import {
  mockLoadAccountByEmail,
  mockValidationStub,
} from '@test-suite/presentation';

const mockHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    accessToken: 'any_access_token',
    password: 'new_password',
  },
});

type SutTypes = {
  sut: ResetPasswordController;
  validationStub: Validation;
  loadAccountByEmailStub: LoadAccountByEmail;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub();
  const loadAccountByEmailStub = mockLoadAccountByEmail();
  const sut = new ResetPasswordController(
    validationStub,
    loadAccountByEmailStub
  );
  return {
    sut,
    validationStub,
    loadAccountByEmailStub,
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

  it('Should call LoadAccountBYEmail with correct email', async () => {
    const { sut, loadAccountByEmailStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailStub, 'loadByEmail');
    const httpRequest = mockHttpRequest();
    await sut.handle(httpRequest);
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
