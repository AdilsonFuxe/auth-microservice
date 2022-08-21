import { dbAddAccount } from '@src/data/usecases';
import { AddAccount } from '@src/domain/usecases';
import { mockAddAccountRepository, mockPasswordHash } from '@test-suite/data';
import { mockAccount } from '@test-suite/domain';
import faker from 'faker';

const makeSut = () => {
  const mockParams = (): AddAccount.Params => ({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
  });
  const passwordHash = jest.fn(mockPasswordHash());
  const addAccountRepository = jest.fn(mockAddAccountRepository());
  const sut = dbAddAccount({
    addAccountRepository,
    passwordHash,
  });

  return {
    sut,
    passwordHash,
    addAccountRepository,
    mockParams,
  };
};

describe('DbAddAccount UseCase', () => {
  it('Should call PasswordHash with correct password', async () => {
    const { sut, passwordHash, mockParams } = makeSut();
    const params = mockParams();
    await sut(params);
    expect(passwordHash).toHaveBeenCalledWith(params.password);
  });

  test('Should throw if PasswordHash throws', async () => {
    const { sut, passwordHash, mockParams } = makeSut();
    passwordHash.mockRejectedValue(new Error());
    const promise = sut(mockParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepository, mockParams } = makeSut();
    const params = mockParams();
    await sut(params);
    expect(addAccountRepository).toHaveBeenCalledWith({
      ...params,
      password: 'hashed_password',
    });
  });

  it('Should throw if AddAccountRepository throw', async () => {
    const { sut, addAccountRepository, mockParams } = makeSut();
    addAccountRepository.mockRejectedValue(new Error());
    const promise = sut(mockParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return an account on success', async () => {
    const { sut, mockParams } = makeSut();
    const result = await sut(mockParams());
    expect(result).toEqual(mockAccount());
  });
});
