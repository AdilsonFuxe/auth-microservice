import { AccountModel } from '@src/infra/db/mongoose/models';
import { hash } from 'bcrypt';
import env from '@src/main/config/env';
import { sign } from 'jsonwebtoken';
import faker from 'faker';
import nodemailer from 'nodemailer';

export const throwError = (): any => {
  throw new Error();
};

type mockCreateAccountResponse = {
  email: string;
  password: string;
  accountId: string;
};

export const mockCreateAccountOnDb =
  async (): Promise<mockCreateAccountResponse> => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const hashedPassword = await hash(password, 12);
    const date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    const doc = new AccountModel({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email,
      password: hashedPassword,
      forgotPasswordAccessToken: 123456,
      forgotPasswordExpiresIn: date,
    });
    await doc.save();
    return { email, password, accountId: doc._id };
  };

export const mockAuthenticateUser = async (): Promise<string> => {
  const { accountId } = await mockCreateAccountOnDb();
  const accessToken = sign({ accountId }, env.jwtSecret);
  await AccountModel.updateOne({ _id: accountId }, { accessToken });
  return accessToken;
};

export const mockNodeMailer = (): jest.Mocked<typeof nodemailer> => {
  const mockedNodeMailer = nodemailer as jest.Mocked<typeof nodemailer>;
  return mockedNodeMailer;
};
