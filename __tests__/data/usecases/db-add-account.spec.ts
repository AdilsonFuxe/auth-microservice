import { AddAccountRepository } from '@/src/data/protocols';
import { DbAddAccount } from '@/src/data/usecases/db-add-account';
import { AccountModel } from '@/src/domain/models';
import { mockAccount, mockAddAccountParams } from '@/test-suite/domain';

const account = mockAccount();

const mockAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(): Promise<AccountModel> {
      return Promise.resolve(account);
    }
  }
  return new AddAccountRepositoryStub();
};

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
    const addSpy = jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });
});
