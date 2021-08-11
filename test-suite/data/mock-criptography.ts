import { Hasher } from '@/src/data/protocols';

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(valud: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }
  return new HasherStub();
};
