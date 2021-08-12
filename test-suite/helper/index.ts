import { AccountMongooseModel } from '@src/infra/db/mongoose/models';
import { hash } from 'bcrypt';
import env from '@src/main/config/env';
import { sign } from 'jsonwebtoken';
import faker from 'faker';

export const trhowError = (): never => {
  throw new Error();
};

export type mockCreateAccountResponse = {
  email: string;
  password: string;
  accountId: string;
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
    return { email, password, accountId: doc._id };
  };

export const mockAuthenticateUser = async (): Promise<string> => {
  const { accountId } = await mockCreateAccountOnDb();
  const accessToken = sign({ accountId }, env.jwtSecret);
  await AccountMongooseModel.updateOne({ _id: accountId }, { accessToken });
  return accessToken;
};
