import request from 'supertest';
import app from '@src/main/config/app';
import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountMongooseModel } from '@src/infra/db/mongoose/models';
import { mockAuthenticateUser } from '@test-suite/helper';

describe('Get /me', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  beforeEach(async () => {
    await AccountMongooseModel.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return 403 on me without accessToken', async () => {
    await request(app).get('/api/v1/me').expect(403);
  });

  test('Should return 200 on me success', async () => {
    const accessToken = await mockAuthenticateUser();
    await request(app)
      .get('/api/v1/me')
      .set('x-access-token', accessToken)
      .expect(200);
  });
});
