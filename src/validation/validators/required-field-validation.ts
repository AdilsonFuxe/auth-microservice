import { MissingParamError } from '@src/interface/errors';
import { Validation } from '@src/interface/protocols';

export const requiredFieldValidation =
  (fieldName: string): Validation =>
  (input) => {
    if (!input[fieldName]) {
      return new MissingParamError(fieldName);
    }
    return null;
  };
