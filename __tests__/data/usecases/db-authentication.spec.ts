import { dbAuthentication } from '@src/data/usecases';
import { Authentication } from '@src/domain/usecases';
import {
  mockEncrypt,
  mockLoadAccountByEmailRepository,
  mockPasswordHashCompare,
  mockUpdateAccessTokenRepository,
} from '@test-suite/data';
import faker from 'faker';

const makeSut = () => {
  const mockParams = (): Authentication.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  const loadAccountByEmailRepository = jest.fn(
    mockLoadAccountByEmailRepository()
  );
  const passwordHashCompare = jest.fn(mockPasswordHashCompare());
  const encrypt = jest.fn(mockEncrypt());
  const updateAccessTokenRepository = jest.fn(
    mockUpdateAccessTokenRepository()
  );
  const sut = dbAuthentication({
    encrypt,
    loadAccountByEmailRepository,
    passwordHashCompare,
    updateAccessTokenRepository,
  });
  return {
    sut,
    loadAccountByEmailRepository,
    passwordHashCompare,
    encrypt,
    updateAccessTokenRepository,
    mockParams,
  };
};

describe('DbAuthentication Usecase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepository, mockParams } = makeSut();
    const params = mockParams();
    await sut(params);
    expect(loadAccountByEmailRepository).toHaveBeenCalledWith(params.email);
  });

  it('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepository, mockParams } = makeSut();
    loadAccountByEmailRepository.mockRejectedValue(new Error());
    const promise = sut(mockParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepository, mockParams } = makeSut();
    loadAccountByEmailRepository.mockReturnValue(null);
    const result = await sut(mockParams());
    expect(result).toBeNull();
  });

  it('Should call PasswordHashCompare with correct values', async () => {
    const { sut, passwordHashCompare, mockParams } = makeSut();
    const params = mockParams();
    await sut(params);
    expect(passwordHashCompare).toHaveBeenCalledWith(
      params.password,
      'valid_password'
    );
  });

  it('Should throw if HashComparer throws', async () => {
    const { sut, passwordHashCompare, mockParams } = makeSut();
    passwordHashCompare.mockRejectedValue(new Error());
    const promise = sut(mockParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return null if HashComparer returns false', async () => {
    const { sut, passwordHashCompare, mockParams } = makeSut();
    passwordHashCompare.mockResolvedValue(false);
    const result = await sut(mockParams());
    expect(result).toBeNull();
  });

  it('Should call Encrypt with correct id', async () => {
    const { sut, encrypt, mockParams } = makeSut();
    await sut(mockParams());
    expect(encrypt).toHaveBeenCalledWith('valid_id');
  });

  it('Should throw if Encrypt throws', async () => {
    const { sut, encrypt, mockParams } = makeSut();
    encrypt.mockRejectedValue(new Error());
    const promise = sut(mockParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should call UpdateAcessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepository, mockParams } = makeSut();
    await sut(mockParams());
    expect(updateAccessTokenRepository).toHaveBeenCalledWith(
      'valid_id',
      'any_token'
    );
  });

  it('Should throw if UpdateAcessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepository, mockParams } = makeSut();
    updateAccessTokenRepository.mockRejectedValue(new Error());
    const promise = sut(mockParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return an token on sucess', async () => {
    const { sut, mockParams } = makeSut();
    const result = await sut(mockParams());
    expect(result).toBe('any_token');
  });
});
