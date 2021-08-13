import { ForgotPasswordController } from '@src/presentation/controllers/forgot-password-controller';
import { HttpRequest, Validation } from '@src/presentation/protocols';
import { mockValidationStub } from '@test-suite/presentation';

const mockHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
  },
});

type SutTypes = {
  sut: ForgotPasswordController;
  validationStub: Validation;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub();
  const sut = new ForgotPasswordController(validationStub);
  return {
    sut,
    validationStub,
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
});
