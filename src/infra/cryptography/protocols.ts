import { Decrypt, Encrypt, PasswordHash } from '@src/data/protocols';

export type BuildJwtDecryptAdapter = (secret: string) => Decrypt;

export type BuildJwtEncryptAdapter = (secret: string) => Encrypt;

export type BuildBcryptPasswordHashAdapter = (salt: number) => PasswordHash;
