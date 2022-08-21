import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { updateAccessTokenRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => updateAccessTokenRepository;

describe('UpdateAccessTokenMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await AccountModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should update accessToken on success', async () => {
    const sut = makeSut();
    const account = await AccountModel.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(account.accessToken).toBeFalsy();
    const accessToken = faker.datatype.uuid();
    await sut(account.id, accessToken);
    const result = await AccountModel.findById(account.id);
    expect(result.accessToken).toBe(accessToken);
  });
});
