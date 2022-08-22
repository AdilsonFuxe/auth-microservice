import { BuildDbSignoutRepository } from '@src/data/usecases/db-signout/protocols';
import { mockSignoutRepository } from '@test-suite/data';

describe('Signout Usecases', () => {
  it('Should call signoutRepository with correct accountId', async () => {
    const dbSignout: BuildDbSignoutRepository =
      ({ signoutRepository }) =>
      async (accountId: string) => {
        await signoutRepository(accountId);
      };
    const signoutRepository = jest.fn(mockSignoutRepository());
    const sut = dbSignout({ signoutRepository });
    await sut('any_account_id');
    expect(signoutRepository).toHaveBeenCalledWith('any_account_id');
  });
});
