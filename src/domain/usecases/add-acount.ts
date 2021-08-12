import { AccountModel } from '@src/domain/models';

export type AddAccountParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface AddAccount {
  add: (account: AddAccountParams) => Promise<AccountModel>;
}
