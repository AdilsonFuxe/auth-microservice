import { UpdatePasswordRepository } from '@src/data/protocols';
import { DbUpdatePassword } from '@src/data/usecases/db-update-password';
import { mockUpdatePasswordRepository } from '@test-suite/data';
import { trhowError } from '@test-suite/helper';

type SutTypes = {
  sut: DbUpdatePassword;
  updatePasswordRepository: UpdatePasswordRepository;
};

const makeSut = (): SutTypes => {
  const updatePasswordRepository = mockUpdatePasswordRepository();
  const sut = new DbUpdatePassword(updatePasswordRepository);
  return {
    sut,
    updatePasswordRepository,
  };
};

describe('UpdatePassword Usecase', () => {
  it('Should call UpdatePasswordRepository with correct values', async () => {
    const { sut, updatePasswordRepository } = makeSut();
    const updatePasswordSpy = jest.spyOn(
      updatePasswordRepository,
      'updatePassword'
    );
    await sut.updatePasseword('any_id', 'new_password');
    expect(updatePasswordSpy).toHaveBeenCalledWith('any_id', 'new_password');
  });

  it('Should throw if Decrypter throws', async () => {
    const { sut, updatePasswordRepository } = makeSut();
    jest
      .spyOn(updatePasswordRepository, 'updatePassword')
      .mockImplementationOnce(trhowError);
    const promise = sut.updatePasseword('any_id', 'new_password');
    await expect(promise).rejects.toThrow();
  });
});
