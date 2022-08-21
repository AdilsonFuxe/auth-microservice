import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { updateForgotPasswordAccessTokenRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => updateForgotPasswordAccessTokenRepository;

describe('UpdateForgotPasswordAccessTokenMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await AccountModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should update password on success', async () => {
    const sut = makeSut();
    const account = await AccountModel.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      accessToken: faker.datatype.uuid(),
    });
    expect(account.forgotPasswordAccessToken).toBeFalsy();
    expect(account.forgotPasswordExpiresIn).toBeFalsy();
    const accessToken = 123456;
    const expiresIn = new Date();
    await sut(account.id, { accessToken, expiresIn });
    const result = await AccountModel.findById(account.id);
    expect(result.forgotPasswordAccessToken).toBe(accessToken);
    expect(result.forgotPasswordExpiresIn).toEqual(expiresIn);
  });
});
