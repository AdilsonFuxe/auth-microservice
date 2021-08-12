import { Encrypter } from '@/src/data/protocols';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ accountId: value }, this.secret);
    return accessToken;
  }
}
