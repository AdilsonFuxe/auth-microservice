import {
  AddAccountRepository,
  Hasher,
  LoadAccountByEmailRepository,
} from '@/src/data/protocols';
import { DbAddAccount } from '@/src/data/usecases/db-add-account';
import { mockAddAccountRepositoryStub, mockHasher } from '@/test-suite/data';
import { mockLoadAccountByEmailRepositoryStub } from '@/test-suite/data/mock-load-account-by-email-repository';
import { mockAccount, mockAddAccountParams } from '@/test-suite/domain';
import { trhowError } from '@/test-suite/helper';

type SutTypes = {
  sut: DbAddAccount;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hasherStub: Hasher;
};

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = mockAddAccountRepositoryStub();
  const loadAccountByEmailRepositoryStub =
    mockLoadAccountByEmailRepositoryStub();
  const hasherStub = mockHasher();
  const sut = new DbAddAccount(
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
    hasherStub
  );
  return {
    sut,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
    hasherStub,
  };
};

describe('DbAddAccount UseCase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(
      loadAccountByEmailRepositoryStub,
      'loadByEmail'
    );
    const accountParams = mockAddAccountParams();
    await sut.add(accountParams);
    expect(loadByEmailSpy).toHaveBeenCalledWith(accountParams.email);
  });

  it('Should throw if loadAccountByEmailRepositoryStub throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockImplementationOnce(trhowError);
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should return null if loadAccountByEmailRepositoryStub returns an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(mockAccount()));
    const account = await sut.add(mockAddAccountParams());
    expect(account).toBeNull();
  });

  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, 'hash');
    const accountParams = mockAddAccountParams();
    await sut.add(accountParams);
    expect(hashSpy).toHaveBeenCalledWith(accountParams.password);
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(trhowError);
    const account = sut.add(mockAddAccountParams());
    await expect(account).rejects.toThrow();
  });

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountParams = mockAddAccountParams();
    await sut.add(accountParams);
    expect(addSpy).toHaveBeenCalledWith({
      email: accountParams.email,
      firstName: accountParams.firstName,
      lastName: accountParams.lastName,
      password: 'hashed_password',
    });
  });

  it('Should throw if AddAccountRepository throw', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockImplementationOnce(trhowError);
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return an account on AddAccountRepository success', async () => {
    const { sut } = makeSut();
    const result = await sut.add(mockAddAccountParams());
    expect(result).toEqual(mockAccount());
  });
});
