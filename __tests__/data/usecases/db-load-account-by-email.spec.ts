import { dbLoadAccountByEmail } from '@src/data/usecases';
import { mockLoadAccountByEmailRepository } from '@test-suite/data';
import { mockAccount } from '@test-suite/domain';

const makeSut = () => {
  const loadAccountByEmailRepository = jest.fn(
    mockLoadAccountByEmailRepository()
  );
  const sut = dbLoadAccountByEmail({ loadAccountByEmailRepository });
  return {
    sut,
    loadAccountByEmailRepository,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut();
    await sut('any_mail@mail.com');
    expect(loadAccountByEmailRepository).toHaveBeenCalledWith(
      'any_mail@mail.com'
    );
  });

  it('Should throw if loadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut();
    loadAccountByEmailRepository.mockRejectedValue(new Error());
    const promise = sut('any_mail@mail.com');
    await expect(promise).rejects.toThrow();
  });

  it('Should return an account on LoadAccountByEmailRepository success', async () => {
    const { sut } = makeSut();
    const account = await sut('any_mail@mail.com');
    expect(account).toEqual(mockAccount());
  });
});
