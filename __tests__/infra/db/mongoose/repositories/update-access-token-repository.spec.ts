import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { mockAddAccountParams } from '@test-suite/domain';
import { AccountMongooseModel } from '@src/infra/db/mongoose/models';
import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => new AccountMongoRepository();

describe('UpdateAccessTokenMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await AccountMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should update accessToken on success', async () => {
    const sut = makeSut();
    const params = mockAddAccountParams();
    const account = await AccountMongooseModel.create(params);
    expect(account.accessToken).toBeFalsy();
    const accessToken = faker.datatype.uuid();
    await sut.updateAccessToken(account.id, accessToken);
    const result = await AccountMongooseModel.findById(account.id);
    expect(result.accessToken).toBe(accessToken);
  });
});
