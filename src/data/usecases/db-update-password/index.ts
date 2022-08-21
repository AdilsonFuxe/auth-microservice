import { BuildDbUpdatePassword } from './protocols';

export const dbUpdatePassword: BuildDbUpdatePassword =
  ({ updatePasswordRepository, passwordHash }) =>
  async (id, password) => {
    const hashedPassword = await passwordHash(password);
    await updatePasswordRepository(id, hashedPassword);
  };
