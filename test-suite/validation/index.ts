import { EmailValidator } from '@/src/validation/protocols';

export const mockEmailVaidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};
