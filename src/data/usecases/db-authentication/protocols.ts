import {
  LoadAccountByEmailRepository,
  PasswordHashCompare,
  UpdateAccessTokenRepository,
  Encrypt,
} from '@src/data/protocols';
import { Authentication } from '@src/domain/usecases';

type Dependencies = {
  loadAccountByEmailRepository: LoadAccountByEmailRepository;
  passwordHashCompare: PasswordHashCompare;
  updateAccessTokenRepository: UpdateAccessTokenRepository;
  encrypt: Encrypt;
};

export type BuildDbAuthentication = (
  dependencies: Dependencies
) => Authentication;
