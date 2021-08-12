import {
  Decrypter,
  Encrypter,
  HashComparer,
  Hasher,
} from '@src/data/protocols';

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

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(): Promise<string> {
      return Promise.resolve('any_token');
    }
  }

  return new EncrypterStub();
};

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(): Promise<string> {
      return Promise.resolve('any_value');
    }
  }
  return new DecrypterStub();
};
