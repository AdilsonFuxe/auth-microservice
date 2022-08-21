import { EmailValidator } from '@src/validation/protocols';
import validator from 'validator';

export const emailValidatorAdapter: EmailValidator = (
  email: string
): boolean => {
  return validator.isEmail(email);
};
