import { BcryptAdapter } from '@/src/infra/cryptography';
import bcrypt from 'bcrypt';

const salt = 12;
const makeSut = (): BcryptAdapter => new BcryptAdapter(salt);

jest.mock('bcrypt', () => ({
  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

describe('BcryptAdapterCompare', () => {
  it('Should call compare with correct values', async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', 'any_hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });

  it('Should return true when compare succeeds', async () => {
    const sut = makeSut();
    const isValid = await sut.compare('any_value', 'any_hash');
    expect(isValid).toBeTruthy();
  });

  it('Should return false when compare fails', async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(async (): Promise<boolean> => {
        return Promise.resolve(false);
      });
    const isValid = await sut.compare('any_value', 'any_hash');
    expect(isValid).toBeFalsy();
  });

  it('Should throw if compare throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(
        async () => new Promise((resolve, reject) => reject(new Error()))
      );
    const hash = sut.compare('any_value', 'any_hash');
    await expect(hash).rejects.toThrow();
  });
});
