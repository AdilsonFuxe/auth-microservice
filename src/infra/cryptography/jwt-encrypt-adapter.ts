import { BuildJwtEncryptAdapter } from './protocols';
import jwt from 'jsonwebtoken';

export const jwtEncryptAdapter: BuildJwtEncryptAdapter =
  (secret: string) => async (value: string) => {
    const accessToken = await jwt.sign({ accountId: value }, secret);
    return accessToken;
  };
