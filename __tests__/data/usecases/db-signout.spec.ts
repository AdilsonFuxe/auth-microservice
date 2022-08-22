import { dbSignout } from '@src/data/usecases';
import { mockSignoutRepository } from '@test-suite/data';

const makeSut = () => {
  const signoutRepository = jest.fn(mockSignoutRepository());
  const sut = dbSignout({ signoutRepository });
  return {
    sut,
    signoutRepository,
  };
};

describe('Signout Usecases', () => {
  it('Should call signoutRepository with correct accountId', async () => {
    const { sut, signoutRepository } = makeSut();
    await sut('any_account_id');
    expect(signoutRepository).toHaveBeenCalledWith('any_account_id');
  });

  it('Should throw if signoutRepository throws', async () => {
    const { sut, signoutRepository } = makeSut();
    signoutRepository.mockRejectedValue(new Error());
    const promise = sut('any_account_id');
    await expect(promise).rejects.toThrow();
  });
});
