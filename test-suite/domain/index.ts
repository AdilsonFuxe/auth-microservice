import { AccountModel } from '@src/domain/models';

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
