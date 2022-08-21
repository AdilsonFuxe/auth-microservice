import bcrypt from 'bcrypt';
import { PasswordHashCompare } from '@src/data/protocols/cryptography';

export const bcryptPasswordHashCompareAdapter: PasswordHashCompare = async (
  value: string,
  hashedValue: string
) => {
  const isValid = await bcrypt.compare(value, hashedValue);
  return isValid;
};
