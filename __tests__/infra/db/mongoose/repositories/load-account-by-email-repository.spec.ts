import { MongoHelper } from '@/src/infra/db/mongoose/helper/mongo-helper';
import { AccountMongooseModel } from '@/src/infra/db/mongoose/models';
import { AccountMongoRepository } from '@/src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => new AccountMongoRepository();

describe('LoadAccountByEmailMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await AccountMongooseModel.deleteMany({});
  });

  it('Should return null account loaded not found', async () => {
    const sut = makeSut();
    const account = await sut.loadByEmail(faker.internet.email());
    expect(account).toBeNull();
  });
});
