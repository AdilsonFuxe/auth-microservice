import bcrypt from 'bcrypt';
import { bcryptHashPasswordHashAdapter } from '@src/infra/cryptography';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await Promise.resolve('hashed_password');
  },
}));

const makeSut = () => bcryptHashPasswordHashAdapter(12);

describe('BcryptHashPasswordAdapter', () => {
  it('Should call hash with correct params', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    const sut = makeSut();
    await sut('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12);
  });

  it('Should return a valid hash on success', async () => {
    const sut = makeSut();
    const hash = await sut('any_value');
    expect(hash).toBe('hashed_password');
  });

  it('Should throw if hash throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(
        async () => await new Promise((resolve, reject) => reject(new Error()))
      );
    const hash = sut('any_value');
    await expect(hash).rejects.toThrow();
  });
});
