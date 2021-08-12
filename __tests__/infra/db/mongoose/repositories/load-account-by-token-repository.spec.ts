import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountMongooseModel } from '@src/infra/db/mongoose/models';
import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => new AccountMongoRepository();

describe('LoadAccountByTokenMongoRepository', () => {
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

  it('Should return an account on loadByToken success', async () => {
    const sut = makeSut();
    const accessToken = faker.datatype.uuid();
    await AccountMongooseModel.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      accessToken,
    });
    const account = await sut.loadByToken(accessToken);
    expect(account).toBeTruthy();
    expect(account.accessToken).toBe(accessToken);
  });
});
