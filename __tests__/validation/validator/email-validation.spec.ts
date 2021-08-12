import { InvalidParamError } from '@/src/presentation/errors';
import { EmailValidator } from '@/src/validation/protocols';
import { EmailValidation } from '@/src/validation/validators/email-validation';
import { trhowError } from '@/test-suite/helper';
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
  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValdatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValdatorStub, 'isValid');
    sut.validate({ email: 'any_email@mail.com' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
  it('Should return an error if EmailValidator returns false', async () => {
    const { sut, emailValdatorStub } = makeSut();
    jest.spyOn(emailValdatorStub, 'isValid').mockReturnValueOnce(false);
    const result = sut.validate({ email: 'any_email@mail.com' });
    expect(result).toEqual(new InvalidParamError('email'));
  });
  it('Should throw if EmailValidator throws', async () => {
    const { sut, emailValdatorStub } = makeSut();
    jest.spyOn(emailValdatorStub, 'isValid').mockImplementation(trhowError);
    expect(sut.validate).toThrow();
  });
});
