import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { loadAccountByIdRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => loadAccountByIdRepository;

describe('LoadAccountByIdMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await AccountModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return null account loaded not found', async () => {
    const sut = makeSut();
    const account = await sut('6114baafc7c1213b601809cd');
    expect(account).toBeNull();
  });

  it('Should return an account on loadById success', async () => {
    const sut = makeSut();
    const newAccount = await AccountModel.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'john.doe@mail.com',
      password: faker.internet.password(),
    });
    const account = await sut(newAccount._id);
    expect(account).toBeTruthy();
  });
});
