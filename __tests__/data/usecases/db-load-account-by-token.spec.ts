import { dbLoadAccountByToken } from '@src/data/usecases';
import {
  mockDecrypt,
  mockLoadAccountByTokenRepository,
} from '@test-suite/data';
import { mockAccount } from '@test-suite/domain';

const makeSut = () => {
  const decrypt = jest.fn(mockDecrypt());
  const loadAccountByTokenRepository = jest.fn(
    mockLoadAccountByTokenRepository()
  );
  const sut = dbLoadAccountByToken({ decrypt, loadAccountByTokenRepository });
  return {
    sut,
    decrypt,
    loadAccountByTokenRepository,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  it('Should call Decrypt with correct values', async () => {
    const { sut, decrypt } = makeSut();
    await sut('any_token');
    expect(decrypt).toHaveBeenCalledWith('any_token');
  });

  it('Should return null if Decrypter return null', async () => {
    const { sut, decrypt } = makeSut();
    decrypt.mockResolvedValue(null);
    const account = await sut('any_token');
    expect(account).toBeNull();
  });

  it('Should throw if Decrypter throws', async () => {
    const { sut, decrypt } = makeSut();
    decrypt.mockRejectedValue(new Error());
    const promise = sut('any_token');
    await expect(promise).rejects.toThrow();
  });

  it('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepository } = makeSut();
    await sut('any_token');
    expect(loadAccountByTokenRepository).toHaveBeenCalledWith('any_token');
  });

  it('Should return null if LoadAccountByTokenRepository return null', async () => {
    const { sut, loadAccountByTokenRepository } = makeSut();
    loadAccountByTokenRepository.mockResolvedValue(null);
    const account = await sut('any_token');
    expect(account).toBeNull();
  });

  it('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepository } = makeSut();
    loadAccountByTokenRepository.mockRejectedValue(new Error());
    const promise = sut('any_token');
    await expect(promise).rejects.toThrow();
  });
  it('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut('any_token');
    expect(account).toEqual(mockAccount());
  });
});
