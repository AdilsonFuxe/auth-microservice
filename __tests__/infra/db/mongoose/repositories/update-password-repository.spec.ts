import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { mockAddAccountParams } from '@test-suite/domain';
import { AccountMongooseModel } from '@src/infra/db/mongoose/models';
import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';

const makeSut = () => new AccountMongoRepository();

describe('UpdatePasswordMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await AccountMongooseModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should update password on success', async () => {
    const sut = makeSut();
    const params = mockAddAccountParams();
    const account = await AccountMongooseModel.create({
      forgotPasswordAccessToken: 123456,
      forgotPasswordExpiresIn: new Date(),
      ...params,
    });
    expect(account.password).toBe(params.password);
    expect(account.forgotPasswordExpiresIn).toBeTruthy();
    expect(account.forgotPasswordAccessToken).toBeTruthy();
    await sut.updatePassword(account.id, 'updatedPassword');
    const result = await AccountMongooseModel.findById(account.id);
    expect(result.password).toBe('updatedPassword');
    expect(result.forgotPasswordExpiresIn).toBeNull();
    expect(result.forgotPasswordAccessToken).toBeNull();
  });
});
