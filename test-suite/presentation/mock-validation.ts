import { Validation } from '@/src/presentation/protocols';

export const mockValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate() {
      return null;
    }
  }
  return new ValidationStub();
};
