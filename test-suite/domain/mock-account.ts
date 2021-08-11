import { AccountModel } from '@/src/domain/models';
import { AddAccountParams } from '@/src/domain/usecases';
import faker from 'faker';

export const mockAddAccountParams = (): AddAccountParams => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccount = (): AccountModel => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  accessToken: faker.datatype.uuid(),
  createdAt: new Date(),
  updatedAt: new Date(),
});
