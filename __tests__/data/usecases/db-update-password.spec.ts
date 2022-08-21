import { dbUpdatePassword } from '@src/data/usecases';
import {
  mockPasswordHash,
  mockUpdatePasswordRepository,
} from '@test-suite/data';

const makeSut = () => {
  const updatePasswordRepository = jest.fn(mockUpdatePasswordRepository());
  const passwordHash = jest.fn(mockPasswordHash());
  const sut = dbUpdatePassword({
    passwordHash,
    updatePasswordRepository,
  });
  return {
    sut,
    updatePasswordRepository,
    passwordHash,
  };
};

describe('UpdatePassword Usecase', () => {
  it('Should call PasswordHash with correct password', async () => {
    const { sut, passwordHash } = makeSut();
    await sut('any_id', 'new_password');
    expect(passwordHash).toHaveBeenCalledWith('new_password');
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, passwordHash } = makeSut();
    passwordHash.mockRejectedValue(new Error());
    const account = sut('any_id', 'new_password');
    await expect(account).rejects.toThrow();
  });

  it('Should call UpdatePasswordRepository with correct values', async () => {
    const { sut, updatePasswordRepository } = makeSut();
    await sut('any_id', 'new_password');
    expect(updatePasswordRepository).toHaveBeenCalledWith(
      'any_id',
      'hashed_password'
    );
  });

  it('Should throw if Decrypter throws', async () => {
    const { sut, updatePasswordRepository } = makeSut();
    updatePasswordRepository.mockRejectedValue(new Error());
    const promise = sut('any_id', 'new_password');
    await expect(promise).rejects.toThrow();
  });
});
