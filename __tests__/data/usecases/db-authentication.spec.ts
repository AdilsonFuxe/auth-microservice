import {
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository,
  UpdateAcessTokenRepository,
} from '@src/data/protocols';
import { DbAuthentication } from '@src/data/usecases/db-authentication';
import {
  mockEncrypter,
  mockHashComparer,
  mockLoadAccountByEmailRepositoryStub,
  mockUpdateAccessTokenRepository,
} from '@test-suite/data';
import { mockAuthenticationParams } from '@test-suite/domain';
import { trhowError } from '@test-suite/helper';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
  updateAcessTokenRepositoryStub: UpdateAcessTokenRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub =
    mockLoadAccountByEmailRepositoryStub();
  const hashComparerStub = mockHashComparer();
  const encrypterStub = mockEncrypter();
  const updateAcessTokenRepositoryStub = mockUpdateAccessTokenRepository();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAcessTokenRepositoryStub
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAcessTokenRepositoryStub,
  };
};

describe('DbAuthentication Usecase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(
      loadAccountByEmailRepositoryStub,
      'loadByEmail'
    );
    const authParams = mockAuthenticationParams();
    await sut.auth(authParams);
    expect(loadByEmailSpy).toHaveBeenCalledWith(authParams.email);
  });

  it('Should throw if LoadAccountByContactRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockImplementationOnce(trhowError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return null if LoadAccountByContactRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(null));
    const accessToken = await sut.auth(mockAuthenticationParams());
    expect(accessToken).toBeNull();
  });

  it('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, 'compare');
    const params = mockAuthenticationParams();
    await sut.auth(params);
    expect(compareSpy).toHaveBeenCalledWith(params.password, 'valid_password');
  });

  it('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(trhowError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const accessToken = await sut.auth(mockAuthenticationParams());
    expect(accessToken).toBeNull();
  });

  it('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.auth(mockAuthenticationParams());
    expect(encryptSpy).toHaveBeenCalledWith('valid_id');
  });

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(trhowError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should call UpdateAcessTokenRepository with correct values', async () => {
    const { sut, updateAcessTokenRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(
      updateAcessTokenRepositoryStub,
      'updateAccessToken'
    );
    await sut.auth(mockAuthenticationParams());
    expect(updateSpy).toHaveBeenCalledWith('valid_id', 'any_token');
  });

  it('Should throw if UpdateAcessTokenRepository throws', async () => {
    const { sut, updateAcessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(updateAcessTokenRepositoryStub, 'updateAccessToken')
      .mockImplementationOnce(trhowError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return an token on sucess', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(mockAuthenticationParams());
    expect(accessToken).toBe('any_token');
  });
});
