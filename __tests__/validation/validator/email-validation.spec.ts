import { EmailValidator } from '@/src/validation/protocols';
import { EmailValidation } from '@/src/validation/validators/email-validation';
import { mockEmailVaidator } from '@/test-suite/validation';

type SutTypes = {
  sut: EmailValidation;
  emailValdatorStub: EmailValidator;
};

const makeSut = (): SutTypes => {
  const emailValdatorStub = mockEmailVaidator();
  const sut = new EmailValidation('email', emailValdatorStub);

  return {
    sut,
    emailValdatorStub,
  };
};

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValdatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValdatorStub, 'isValid');
    sut.validate({ email: 'any_email@mail.com' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
