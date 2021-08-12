import { LoadAccountByIdlRepository } from '@src/data/protocols';
import { DbLoadAccountById } from '@src/data/usecases/db-load-accout-by-id';
import { mockLoadAccountByIdRepository } from '@test-suite/data';

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
});
