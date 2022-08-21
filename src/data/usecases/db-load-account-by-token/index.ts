import { BuildDbLoadAccountByToken } from './protocols';

export const dbLoadAccountByToken: BuildDbLoadAccountByToken =
  ({ loadAccountByTokenRepository, decrypt }) =>
  async (accessToken) => {
    const decryptedToken = await decrypt(accessToken);
    if (decryptedToken) {
      const account = await loadAccountByTokenRepository(accessToken);
      return account;
    }
    return null;
  };
