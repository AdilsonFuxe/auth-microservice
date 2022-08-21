import bcrypt from 'bcrypt';
import { BuildBcryptPasswordHashAdapter } from './protocols';

export const bcryptHashPasswordHashAdapter: BuildBcryptPasswordHashAdapter =
  (salt: number) =>
  async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };
