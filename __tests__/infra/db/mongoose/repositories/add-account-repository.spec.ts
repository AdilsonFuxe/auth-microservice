import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { addAccountRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => {
  const mockParams = () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  return { sut: addAccountRepository, mockParams };
};

describe('AddAccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await AccountModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return an account on add success', async () => {
    const { sut, mockParams } = makeSut();
    const accountParams = mockParams();
    const account = await sut(accountParams);
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.firstName).toBe(accountParams.firstName);
    expect(account.lastName).toBe(accountParams.lastName);
    expect(account.email).toBe(accountParams.email);
    expect(account.password).toBe(accountParams.password);
  });
});
