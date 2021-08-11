import { SignUpController } from '@/src/presentation/controllers/signup-controller';
import { HttpRequest, Validation } from '@/src/presentation/protocols';

const mockHttpRequest = (): HttpRequest => ({
  body: {
    firstName: 'any_name',
    lastName: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

describe('SignUpController', () => {
  it('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate() {
        return null;
      }
    }
    const validationStub = new ValidationStub();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = mockHttpRequest();
    const sut = new SignUpController(validationStub);
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
