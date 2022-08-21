import { LoadAccountByEmailRepository } from '@src/data/protocols';
import { LoadAccountByEmail } from '@src/domain/usecases';

type Dependencies = {
  loadAccountByEmailRepository: LoadAccountByEmailRepository;
};

export type BuildDbLoadAccountByEmail = (
  dependencies: Dependencies
) => LoadAccountByEmail;
