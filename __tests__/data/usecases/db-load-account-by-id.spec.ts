import { LoadAccountByIdlRepository } from '@src/data/protocols';
import { DbLoadAccountById } from '@src/data/usecases/db-load-accout-by-id';
import { mockLoadAccountByIdRepository } from '@test-suite/data';
import { mockAccount } from '@test-suite/domain';
import { trhowError } from '@test-suite/helper';

type SutTypes = {
  sut: DbLoadAccountById;
  loadAccountByIdRepositoryStub: LoadAccountByIdlRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository();
  const sut = new DbLoadAccountById(loadAccountByIdRepositoryStub);
  return {
    sut,
    loadAccountByIdRepositoryStub,
  };
};

describe('LoadAccountById Usecase', () => {
  it('Should call LoadAccountByIdRepository with correct id', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById');
    await sut.loadById('any_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  it('Should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockImplementationOnce(trhowError);
    const promise = sut.loadById('any_id');
    await expect(promise).rejects.toThrow();
  });

  it('Should return a ccount on LoadAccountByIdRepository success', async () => {
    const { sut } = makeSut();
    const account = await sut.loadById('any_id');
    expect(account).toEqual(mockAccount());
  });
});
