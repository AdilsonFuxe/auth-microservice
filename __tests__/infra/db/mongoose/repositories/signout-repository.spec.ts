import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { signoutRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => signoutRepository;

describe('SignoutRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await AccountModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should update accessToken to null on success', async () => {
    const sut = makeSut();
    const accessToken = faker.datatype.uuid();
    const account = await AccountModel.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      accessToken,
    });
    expect(account.accessToken).toBe(accessToken);
    await sut(account.id);
    const result = await AccountModel.findById(account.id);
    expect(result.accessToken).toBeNull();
  });
});
