import { SignInController } from '@src/presentation/controllers/signin-controller';
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
});
