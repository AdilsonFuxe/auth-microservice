import { HashComparer, Hasher } from '@/src/data/protocols';

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(valud: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }
  return new HasherStub();
};

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashComparerStub();
};
