import request from 'supertest';
import app from '@src/main/config/app';
import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { mockAuthenticateUser } from '@test-suite/helper';

describe('Get /me', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    await AccountModel.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return 401 on me without accessToken', async () => {
    await request(app).get('/api/v1/me').expect(401);
  });

  test('Should return 200 on me success', async () => {
    const accessToken = await mockAuthenticateUser();
    await request(app)
      .get('/api/v1/me')
      .set('x-access-token', accessToken)
      .expect(200);
  });
});
