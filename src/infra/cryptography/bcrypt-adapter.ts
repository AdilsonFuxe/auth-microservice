import { Hasher } from '@/src/data/protocols';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}
  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }
}
