import request from 'supertest';
import app from '@src/main/config/app';
import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { mockAuthenticateUser } from '@test-suite/helper';

describe('Delete /signout', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await AccountModel.deleteMany({});
    await MongoHelper.disconnect();
  });

  it('Should return 401 on me without accessToken', async () => {
    await request(app).delete('/api/v1/signout').expect(401);
  });

  it('Should return 204 on signout success', async () => {
    const accessToken = await mockAuthenticateUser();
    const accountBeforeSignout = await AccountModel.findOne({ accessToken });
    await request(app)
      .delete('/api/v1/signout')
      .set('x-access-token', accessToken)
      .expect(204);
    const accountAfterSignout = await AccountModel.findOne({ accessToken });
    expect(accountBeforeSignout).toBeTruthy();
    expect(accountAfterSignout).toBeFalsy();
  });
});
