import { Decrypt, LoadAccountByTokenRepository } from '@src/data/protocols';
import { LoadAccountByToken } from '@src/domain/usecases';

type Dependencies = {
  loadAccountByTokenRepository: LoadAccountByTokenRepository;
  decrypt: Decrypt;
};

export type BuildDbLoadAccountByToken = (
  dependencies: Dependencies
) => LoadAccountByToken;
