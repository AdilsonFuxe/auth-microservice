import { Decrypter, LoadAccountByTokenRepository } from '@src/data/protocols';
import { DbLoadAccountByToken } from '@src/data/usecases/db-load-account-by-token';
import {
  mockDecrypter,
  mockLoadAccountByTokenRepository,
} from '@test-suite/data';
import { mockAccount } from '@test-suite/domain';
import { trhowError } from '@test-suite/helper';
import mockDate from 'mockdate';

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository;
};

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter();
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository();
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  );
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  beforeAll(() => {
    mockDate.set(new Date());
  });

  afterAll(() => {
    mockDate.reset();
  });
  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.loadByToken('any_token');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  it('Should return null if Decrypter return null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.loadByToken('any_token');
    expect(account).toBeNull();
  });

  it('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(trhowError);
    const promise = sut.loadByToken('any_token');
    await expect(promise).rejects.toThrow();
  });

  it('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      'loadByToken'
    );
    await sut.loadByToken('any_token');
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token');
  });

  it('Should return null if LoadAccountByTokenRepository return null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(Promise.resolve(null));

    const account = await sut.loadByToken('any_token');
    expect(account).toBeNull();
  });

  it('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.loadByToken('any_token');
    expect(account).toEqual(mockAccount());
  });

  it('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockImplementationOnce(trhowError);
    const promise = sut.loadByToken('any_token');
    await expect(promise).rejects.toThrow();
  });
});
