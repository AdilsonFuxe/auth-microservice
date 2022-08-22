import { SignoutRepository } from '@src/data/protocols';
import { Signout } from '@src/domain/usecases';

type Dependencies = {
  signoutRepository: SignoutRepository;
};

export type BuildDbSignoutRepository = (dependencies: Dependencies) => Signout;
