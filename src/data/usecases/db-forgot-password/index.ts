import { BuildDbForgotPassword } from './protocols';

export const dbForgotPassword: BuildDbForgotPassword =
  ({ generateAccessToken, updateForgotPasswordAccessTokenRepository }) =>
  async (id) => {
    const accessToken = generateAccessToken();
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 5);
    await updateForgotPasswordAccessTokenRepository(id, {
      accessToken,
      expiresIn,
    });
    return {
      accessToken,
      expiresIn,
    };
  };
