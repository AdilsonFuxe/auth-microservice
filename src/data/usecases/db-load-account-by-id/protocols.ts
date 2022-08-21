import { LoadAccountByIdRepository } from '@src/data/protocols';
import { LoadAccountById } from '@src/domain/usecases';

type Dependencies = {
  loadAccountByIdRepository: LoadAccountByIdRepository;
};

export type BuildDbLoadAccountById = (
  dependencies: Dependencies
) => LoadAccountById;
