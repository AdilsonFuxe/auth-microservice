import { ResetPasswordController } from '@src/presentation/controllers/reset-password-controller';
import { HttpRequest, Validation } from '@src/presentation/protocols';
import { mockValidationStub } from '@test-suite/presentation';

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
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub();
  const sut = new ResetPasswordController(validationStub);
  return {
    sut,
    validationStub,
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
});
