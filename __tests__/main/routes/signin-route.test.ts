import request from 'supertest';
import app from '@src/main/config/app';
import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountMongooseModel } from '@src/infra/db/mongoose/models';
import { mockCreateAccountOnDb } from '@test-suite/helper';

describe('Post /login', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  beforeEach(async () => {
    await AccountMongooseModel.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return 200 on login', async () => {
    const { email, password } = await mockCreateAccountOnDb();
    await request(app)
      .post('/api/v1/signin')
      .send({ email, password })
      .expect(200);
  });

  test('Should return 401 on login', async () => {
    await request(app)
      .post('/api/v1/signin')
      .send({
        email: 'invalid_email@mail.com',
        password: '1234',
      })
      .expect(401);
  });
});
