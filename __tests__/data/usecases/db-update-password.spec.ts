import { Hasher, UpdatePasswordRepository } from '@src/data/protocols';
import { DbUpdatePassword } from '@src/data/usecases/db-update-password';
import { mockHasher, mockUpdatePasswordRepository } from '@test-suite/data';
import { trhowError } from '@test-suite/helper';

type SutTypes = {
  sut: DbUpdatePassword;
  updatePasswordRepository: UpdatePasswordRepository;
  hasherStub: Hasher;
};

const makeSut = (): SutTypes => {
  const updatePasswordRepository = mockUpdatePasswordRepository();
  const hasherStub = mockHasher();
  const sut = new DbUpdatePassword(updatePasswordRepository, hasherStub);
  return {
    sut,
    updatePasswordRepository,
    hasherStub,
  };
};

describe('UpdatePassword Usecase', () => {
  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, 'hash');
    await sut.updatePasseword('any_id', 'new_password');
    expect(hashSpy).toHaveBeenCalledWith('new_password');
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(trhowError);
    const account = sut.updatePasseword('any_id', 'new_password');
    await expect(account).rejects.toThrow();
  });

  it('Should call UpdatePasswordRepository with correct values', async () => {
    const { sut, updatePasswordRepository } = makeSut();
    const updatePasswordSpy = jest.spyOn(
      updatePasswordRepository,
      'updatePassword'
    );
    await sut.updatePasseword('any_id', 'new_password');
    expect(updatePasswordSpy).toHaveBeenCalledWith('any_id', 'hashed_password');
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
