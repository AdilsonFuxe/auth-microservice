import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { updatePasswordRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => updatePasswordRepository;

describe('UpdatePasswordMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await AccountModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should update password on success', async () => {
    const sut = makeSut();
    const params = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      accessToken: faker.datatype.uuid(),
    };
    const account = await AccountModel.create({
      forgotPasswordAccessToken: 123456,
      forgotPasswordExpiresIn: new Date(),
      ...params,
    });
    expect(account.password).toBe(params.password);
    expect(account.forgotPasswordExpiresIn).toBeTruthy();
    expect(account.forgotPasswordAccessToken).toBeTruthy();
    await sut(account.id, 'updatedPassword');
    const result = await AccountModel.findById(account.id);
    expect(result.password).toBe('updatedPassword');
    expect(result.forgotPasswordExpiresIn).toBeNull();
    expect(result.forgotPasswordAccessToken).toBeNull();
  });
});
