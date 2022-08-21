import bcrypt from 'bcrypt';
import { bcryptPasswordHashCompareAdapter } from '@src/infra/cryptography';

jest.mock('bcrypt', () => ({
  async compare(): Promise<boolean> {
    return await Promise.resolve(true);
  },
}));

const makeSut = () => bcryptPasswordHashCompareAdapter;

describe('BcryptHashCompareAdapter', () => {
  it('Should call compare with correct values', async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut('any_value', 'any_hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });

  it('Should return true when compare succeeds', async () => {
    const sut = makeSut();
    const isValid = await sut('any_value', 'any_hash');
    expect(isValid).toBeTruthy();
  });

  it('Should return false when compare fails', async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(async (): Promise<boolean> => {
        return await Promise.resolve(false);
      });
    const isValid = await sut('any_value', 'any_hash');
    expect(isValid).toBeFalsy();
  });

  it('Should throw if compare throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(
        async () => await new Promise((resolve, reject) => reject(new Error()))
      );
    const hash = sut('any_value', 'any_hash');
    await expect(hash).rejects.toThrow();
  });
});
