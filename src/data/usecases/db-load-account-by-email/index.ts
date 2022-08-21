import { BuildDbLoadAccountByEmail } from './protocols';

export const dbLoadAccountByEmail: BuildDbLoadAccountByEmail =
  ({ loadAccountByEmailRepository }) =>
  async (email) => {
    const account = await loadAccountByEmailRepository(email);
    return account;
  };
