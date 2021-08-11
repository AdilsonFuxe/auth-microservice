import { Authentication } from '@/src/domain/usecases';

export const mockAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(): Promise<string> {
      return Promise.resolve('any_access_token');
    }
  }
  return new AuthenticationStub();
};
