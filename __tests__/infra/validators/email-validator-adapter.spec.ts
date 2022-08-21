import { emailValidatorAdapter } from '@src/infra/validators';
import validator from 'validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

const makeSut = () => emailValidatorAdapter;

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut('invalid_email@gmail.com');
    expect(isValid).toBeFalsy();
  });
  it('Should return true if validator returns true', () => {
    const sut = makeSut();
    const isValid = sut('valid_email@gmail.com');
    expect(isValid).toBeTruthy();
  });
  it('Should call validator with correct email', () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    sut('any_email@gmail.com');
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@gmail.com');
  });
});
