import { dbLoadAccountById } from '@src/data/usecases';
import { mockLoadAccountByIdRepository } from '@test-suite/data';
import { mockAccount } from '@test-suite/domain';

const makeSut = () => {
  const loadAccountByIdRepository = jest.fn(mockLoadAccountByIdRepository());
  const sut = dbLoadAccountById({ loadAccountByIdRepository });
  return {
    sut,
    loadAccountByIdRepository,
  };
};

describe('LoadAccountById Usecase', () => {
  it('Should call LoadAccountByIdRepository with correct id', async () => {
    const { sut, loadAccountByIdRepository } = makeSut();
    await sut('any_id');
    expect(loadAccountByIdRepository).toHaveBeenCalledWith('any_id');
  });

  it('Should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepository } = makeSut();
    loadAccountByIdRepository.mockRejectedValue(new Error());
    const promise = sut('any_id');
    await expect(promise).rejects.toThrow();
  });

  it('Should return a ccount on LoadAccountByIdRepository success', async () => {
    const { sut } = makeSut();
    const account = await sut('any_id');
    expect(account).toEqual(mockAccount());
  });
});
