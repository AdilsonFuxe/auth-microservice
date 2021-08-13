import { AccountModel } from '@src/domain/models';
import { AddAccountParams, AuthenticationParams } from '@src/domain/usecases';
import { ForgotPasswordResponse } from '@src/domain/usecases/forgot-password';
import faker from 'faker';

export const mockAddAccountParams = (): AddAccountParams => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccount = (): AccountModel => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 5);
  return {
    id: 'valid_id',
    firstName: 'valid_first_name',
    lastName: 'valid_last_name',
    email: 'valid_email',
    password: 'valid_password',
    accessToken: 'valid_accessToken',
    forgotPasswordAccessToken: 123456,
    forgotPasswordExpiresIn: date,
  };
};

export const mockForgotPasswordResponse = (): ForgotPasswordResponse => ({
  accessToken: 123456,
  expiresIn: new Date(),
});
