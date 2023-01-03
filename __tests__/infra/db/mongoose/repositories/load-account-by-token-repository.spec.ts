import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { loadAccountByTokenRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => loadAccountByTokenRepository;

describe('LoadAccountByTokenMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await AccountModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return null account loaded not found', async () => {
    const sut = makeSut();
    const account = await sut(faker.random.alphaNumeric(10));
    expect(account).toBeNull();
  });

  it('Should return an account on loadByToken success', async () => {
    const sut = makeSut();
    const accessToken = faker.datatype.uuid();
    await AccountModel.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      sessions: [
        {
          accessToken,
          createdAt: new Date(2023, 9, 24),
          updatedAt: new Date(2023, 9, 24),
        },
      ],
    });
    const account = await sut(accessToken);
    expect(account).toBeTruthy();
  });
});
