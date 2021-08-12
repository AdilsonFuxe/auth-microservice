import { BcryptAdapter } from '@src/infra/cryptography';
import bcrypt from 'bcrypt';

const salt = 12;
const makeSut = (): BcryptAdapter => new BcryptAdapter(salt);

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash');
  },
}));

describe('Bcrypt Adapter Hash', () => {
  it('Should call hash with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  it('Should return a valid hash on hash success', async () => {
    const sut = makeSut();
    const hash = await sut.hash('any_value');
    expect(hash).toBe('hash');
  });

  it('Should throw if hash throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(
        async () => new Promise((resolve, reject) => reject(new Error()))
      );
    const hash = sut.hash('any_value');
    await expect(hash).rejects.toThrow();
  });
});
