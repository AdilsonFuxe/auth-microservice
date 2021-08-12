import { LoadAccountByEmailRepository } from '@src/data/protocols';
import { DbLoadAccountByEmail } from '@src/data/usecases/db-load-account-by-email';
import { mockLoadAccountByEmailRepositoryStub } from '@test-suite/data';
import { trhowError } from '@test-suite/helper';

type SutTypes = {
  sut: DbLoadAccountByEmail;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub =
    mockLoadAccountByEmailRepositoryStub();
  const sut = new DbLoadAccountByEmail(loadAccountByEmailRepositoryStub);
  return {
    sut,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(
      loadAccountByEmailRepositoryStub,
      'loadByEmail'
    );
    await sut.loadByEmail('any_mail@mail.com');
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_mail@mail.com');
  });

  it('Should throw if loadAccountByEmailRepositoryStub throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockImplementationOnce(trhowError);
    const promise = sut.loadByEmail('any_mail@mail.com');
    await expect(promise).rejects.toThrow();
  });
});
