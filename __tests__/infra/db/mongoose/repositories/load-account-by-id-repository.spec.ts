import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountMongooseModel } from '@src/infra/db/mongoose/models';
import { AccountMongoRepository } from '@src/infra/db/mongoose/repositories';
import { mockAddAccountParams } from '@test-suite/domain';

const makeSut = () => new AccountMongoRepository();

describe('LoadAccountByIdMongoRepository', () => {
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
    const account = await sut.loadById('6114baafc7c1213b601809cd');
    expect(account).toBeNull();
  });

  it('Should return an account on loadById success', async () => {
    const sut = makeSut();
    const params = mockAddAccountParams();
    const newAccount = await AccountMongooseModel.create(params);
    const account = await sut.loadById(newAccount._id);
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.firstName).toBe(params.firstName);
    expect(account.lastName).toBe(params.lastName);
    expect(account.email).toBe(params.email);
    expect(account.password).toBe(params.password);
  });
});
