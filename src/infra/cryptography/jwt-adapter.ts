import { Decrypter, Encrypter } from '@src/data/protocols';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ accountId: value }, this.secret);
    return accessToken;
  }

  async decrypt(token: string): Promise<string | null> {
    const value: any = await jwt.verify(token, this.secret);
    return value?.accountId;
  }
}
