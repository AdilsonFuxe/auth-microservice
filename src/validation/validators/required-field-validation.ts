import { MissingParamError } from '@src/presentation/errors';
import { Validation } from '@src/presentation/protocols';

export const requiredFieldValidation =
  (fieldName: string): Validation =>
  (input) => {
    if (!input[fieldName]) {
      return new MissingParamError(fieldName);
    }
    return null;
  };
