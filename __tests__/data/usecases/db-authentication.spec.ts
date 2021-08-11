import { LoadAccountByEmailRepository } from '@/src/data/protocols';
import { DbAuthentication } from '@/src/data/usecases/db-authentication';
import { mockLoadAccountByEmailRepositoryStub } from '@/test-suite/data';
import { mockAuthenticationParams } from '@/test-suite/domain';

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
});
