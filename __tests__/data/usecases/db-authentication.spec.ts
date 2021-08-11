import { LoadAccountByEmailRepository } from '@/src/data/protocols';
import { DbAuthentication } from '@/src/data/usecases/db-authentication';
import { mockLoadAccountByEmailRepositoryStub } from '@/test-suite/data';
import { mockAccount, mockAuthenticationParams } from '@/test-suite/domain';
import { trhowError } from '@/test-suite/helper';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub =
    mockLoadAccountByEmailRepositoryStub();
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);
  return {
    sut,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbAuthentication Usecase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(
      loadAccountByEmailRepositoryStub,
      'loadByEmail'
    );
    const accountParams = mockAuthenticationParams();
    await sut.auth(accountParams);
    expect(loadByEmailSpy).toHaveBeenCalledWith(accountParams.email);
  });

  it('Should throw if loadAccountByEmailRepositoryStub throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockImplementationOnce(trhowError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should return null if loadAccountByEmailRepositoryStub returns an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(mockAccount()));
    const accessToken = await sut.auth(mockAuthenticationParams());
    expect(accessToken).toBeNull();
  });
});
