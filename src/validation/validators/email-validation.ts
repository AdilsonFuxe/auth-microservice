import { InvalidParamError } from '@src/interface/errors';
import { Validation } from '@src/interface/protocols';
import { EmailValidator } from '@src/validation/protocols';

export const emailValidation =
  (fieldName: string, emailValidator: EmailValidator): Validation =>
  (input) => {
    const isValid = emailValidator(input[fieldName]);
    if (!isValid) {
      return new InvalidParamError(fieldName);
    }
    return null;
  };
