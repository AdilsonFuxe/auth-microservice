import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { mockAddAccountParams } from '@test-suite/domain';
import { AccountMongooseModel } from '@src/infra/db/mongoose/models';
import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';
import faker from 'faker';

const makeSut = () => new AccountMongoRepository();

describe('UpdateForgotPasswordAccessTokenMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await AccountMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should update forgot password access token on success', async () => {
    const sut = makeSut();
    const params = mockAddAccountParams();
    const account = await AccountMongooseModel.create(params);
    expect(account.forgotPasswordAccessToken).toBeFalsy();
    expect(account.forgotPasswordExpiresIn).toBeFalsy();
    const accessToken = 123456;
    const expiresIn = new Date();
    await sut.updateForgotPasswordToken(account.id, { accessToken, expiresIn });
    const result = await AccountMongooseModel.findById(account.id);
    expect(result.forgotPasswordAccessToken).toBe(accessToken);
    expect(result.forgotPasswordExpiresIn).toEqual(expiresIn);
  });
});
