import request from 'supertest';
import app from '@src/main/config/app';
import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { mockCreateAccountOnDb } from '@test-suite/helper';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {}),
  }),
}));

describe('Patch /forgot', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    await AccountModel.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return 204 on forgot password success', async () => {
    const { email } = await mockCreateAccountOnDb();
    await request(app).patch('/api/v1/forgot').send({ email }).expect(204);
  });
});
