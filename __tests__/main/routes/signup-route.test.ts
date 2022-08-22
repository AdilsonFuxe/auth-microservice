import request from 'supertest';
import app from '@src/main/config/app';
import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { HttpStatusCode } from '@src/interface/protocols';
import faker from 'faker';

describe('Post /signup', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    await AccountModel.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('Should return 201 on signup', async () => {
    await request(app)
      .post('/api/v1/signup')
      .send({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: '1234',
        passwordConfirmation: '1234',
      })
      .expect(HttpStatusCode.created);
  });
});
