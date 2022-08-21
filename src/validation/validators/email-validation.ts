import { InvalidParamError } from '@src/presentation/errors';
import { Validation } from '@src/presentation/protocols';
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
