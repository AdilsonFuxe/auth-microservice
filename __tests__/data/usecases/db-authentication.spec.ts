import {
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository,
} from '@/src/data/protocols';
import { DbAuthentication } from '@/src/data/usecases/db-authentication';
import {
  mockEncrypter,
  mockHashComparer,
  mockLoadAccountByEmailRepositoryStub,
} from '@/test-suite/data';
import { mockAccount, mockAuthenticationParams } from '@/test-suite/domain';
import { trhowError } from '@/test-suite/helper';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub =
    mockLoadAccountByEmailRepositoryStub();
  const hashComparerStub = mockHashComparer();
  const encrypterStub = mockEncrypter();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
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

  it('Should throw if loadAccountByEmailRepositoryStub throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockImplementationOnce(trhowError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return null if loadAccountByEmailRepositoryStub returns an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(mockAccount()));
    const accessToken = await sut.auth(mockAuthenticationParams());
    expect(accessToken).toBeNull();
  });

  it('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub, loadAccountByEmailRepositoryStub } =
      makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(
        Promise.resolve({
          id: 'valid_id',
          firstName: 'valid_first_name',
          lastName: 'valid_last_name',
          email: 'valid_email',
          password: 'hashed_password',
          accessToken: 'valid_accessToken',
        })
      );
    const compareSpy = jest.spyOn(hashComparerStub, 'compare');
    const authParams = mockAuthenticationParams();
    await sut.auth(authParams);
    expect(compareSpy).toHaveBeenCalledWith(
      authParams.password,
      'hashed_password'
    );
  });

  it('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const accessToken = await sut.auth(mockAuthenticationParams());
    expect(accessToken).toBeNull();
  });

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.auth(mockAuthenticationParams());
    expect(encryptSpy).toHaveBeenCalledWith('valid_id');
  });
});
