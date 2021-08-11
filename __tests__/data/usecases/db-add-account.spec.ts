import { AddAccountRepository } from '@/src/data/protocols';
import { DbAddAccount } from '@/src/data/usecases/db-add-account';
import { AccountModel } from '@/src/domain/models';
import { AddAccountParams } from '@/src/domain/usecases';
import faker from 'faker';

const mockAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(): Promise<AccountModel> {
      const newAccount: AccountModel = {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        accessToken: faker.datatype.uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return Promise.resolve(newAccount);
    }
  }
  return new AddAccountRepositoryStub();
};

describe('DbAddAccount UseCase', () => {
  it('Should call AddAccountRepository with correct values', async () => {
    const addAccountRepositoryStub = mockAddAccountRepositoryStub();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const sut = new DbAddAccount(addAccountRepositoryStub);
    const accountParams: AddAccountParams = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await sut.add(accountParams);
    expect(addSpy).toHaveBeenCalledWith(accountParams);
    expect(1).toBe(1);
  });
});
