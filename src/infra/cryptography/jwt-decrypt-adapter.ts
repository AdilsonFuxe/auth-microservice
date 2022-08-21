import jwt from 'jsonwebtoken';
import { BuildJwtDecryptAdapter } from './protocols';

export const jwtDecryptAdapter: BuildJwtDecryptAdapter =
  (secret: string) => async (token: string) => {
    const value: any = await jwt.verify(token, secret);
    return value?.accountId;
  };
