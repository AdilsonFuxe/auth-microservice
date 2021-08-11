import { AddAccountRepository } from '@/src/data/protocols';
import { DbAddAccount } from '@/src/data/usecases/db-add-account';
import { mockAddAccountRepositoryStub } from '@/test-suite/data';
import { mockAccount, mockAddAccountParams } from '@/test-suite/domain';

type SutTypes = {
  sut: DbAddAccount;
  addAccountRepositoryStub: AddAccountRepository;
};

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = mockAddAccountRepositoryStub();
  const sut = new DbAddAccount(addAccountRepositoryStub);
  return {
    sut,
    addAccountRepositoryStub,
  };
};

describe('DbAddAccount UseCase', () => {
  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountParams = mockAddAccountParams();
    await sut.add(accountParams);
    expect(addSpy).toHaveBeenCalledWith(accountParams);
  });

  it('Should throw if AddAccountRepository throw', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return an account on AddAccountRepository success', async () => {
    const { sut } = makeSut();
    const result = await sut.add(mockAddAccountParams());
    expect(result).toEqual(mockAccount());
  });
});
