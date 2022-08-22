import { InvalidParamError } from '@src/interface/errors';
import { Validation } from '@src/interface/protocols';

export const compareFieldValidation =
  (fieldName: string, fieldToCompare: string): Validation =>
  (input) => {
    if (input[fieldName] !== input[fieldToCompare]) {
      return new InvalidParamError(fieldToCompare);
    }
    return null;
  };
