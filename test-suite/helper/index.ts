import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';
import { AccountMongooseModel } from '@src/infra/db/mongoose/models';
import { hash } from 'bcrypt';
import faker from 'faker';

export const trhowError = (): never => {
  throw new Error();
};

export type mockCreateAccountResponse = {
  email: string;
  password: string;
};

export const mockCreateAccountOnDb =
  async (): Promise<mockCreateAccountResponse> => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const hashed_password = await hash(password, 12);
    const doc = new AccountMongooseModel({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email,
      password: hashed_password,
    });
    await doc.save();
    return { email, password };
  };
