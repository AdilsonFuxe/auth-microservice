import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { loadAccountByEmailRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => loadAccountByEmailRepository;

describe('LoadAccountByEmailMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    await AccountModel.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'john.doe@mail.com',
      password: faker.internet.password(),
    });
  });

  afterAll(async () => {
    await AccountModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return null account loaded not found', async () => {
    const sut = makeSut();
    const account = await sut(faker.internet.email());
    expect(account).toBeNull();
  });

  it('Should return an account on loadByEmail success', async () => {
    const sut = makeSut();
    const account = await sut('john.doe@mail.com');
    expect(account).toBeTruthy();
  });
});
