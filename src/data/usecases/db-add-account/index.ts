import { BuildDbAddAccount } from './protocols';

export const dbAddAccount: BuildDbAddAccount =
  ({ passwordHash, addAccountRepository }) =>
  async ({ email, firstName, lastName, password }) => {
    const hashedPassword = await passwordHash(password);
    const result = await addAccountRepository({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    return result;
  };
