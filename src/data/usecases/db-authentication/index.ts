import { BuildDbAuthentication } from './protocols';

export const dbAuthentication: BuildDbAuthentication =
  ({
    loadAccountByEmailRepository,
    passwordHashCompare,
    encrypt,
    updateAccessTokenRepository,
  }) =>
  async (params) => {
    const account = await loadAccountByEmailRepository(params.email);
    if (account) {
      const isValid = await passwordHashCompare(
        params.password,
        account.password
      );
      if (isValid) {
        const accessToken = await encrypt(account.id);
        await updateAccessTokenRepository(account.id, accessToken);
        return accessToken;
      }
    }
    return null;
  };
