import { BuildDbLoadAccountById } from './protocols';

export const dbLoadAccountById: BuildDbLoadAccountById =
  ({ loadAccountByIdRepository }) =>
  async (id) => {
    const account = await loadAccountByIdRepository(id);
    return account;
  };
