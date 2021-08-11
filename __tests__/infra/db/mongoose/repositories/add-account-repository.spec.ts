import { MongoHelper } from '@/src/infra/db/mongoose/helper/mongo-helper';
import { mockAddAccountParams } from '@/test-suite/domain';
import { AccountMongooseModel } from '@/src/infra/db/mongoose/models';
import { AccountMongoRepository } from '@/src/infra/db/mongoose/repositories';

describe('AddAccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await AccountMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return an account on add success', async () => {
    const sut = new AccountMongoRepository();
    const accountParams = mockAddAccountParams();
    const account = await sut.add(accountParams);
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.firstName).toBe(accountParams.firstName);
    expect(account.lastName).toBe(accountParams.lastName);
    expect(account.email).toBe(accountParams.email);
    expect(account.password).toBe(accountParams.password);
  });
});
