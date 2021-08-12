import { SignInController } from '@src/presentation/controllers/signin-controller';
import { MissingParamError } from '@src/presentation/errors';
import { badRequest } from '@src/presentation/helpers/http/http-helper';
import { HttpRequest, Validation } from '@src/presentation/protocols';
import { mockValidationStub } from '@test-suite/presentation';

const mockHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password',
  },
});

type SutTypes = {
  sut: SignInController;
  validationStub: Validation;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub();
  const sut = new SignInController(validationStub);
  return {
    sut,
    validationStub,
  };
};

describe('SignIn Controller', () => {
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
});
