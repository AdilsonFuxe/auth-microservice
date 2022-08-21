import { InvalidParamError } from '@src/presentation/errors';
import { Validation } from '@src/presentation/protocols';

export const compareFieldValidation =
  (fieldName: string, fieldToCompare: string): Validation =>
  (input) => {
    if (input[fieldName] !== input[fieldToCompare]) {
      return new InvalidParamError(fieldToCompare);
    }
    return null;
  };
