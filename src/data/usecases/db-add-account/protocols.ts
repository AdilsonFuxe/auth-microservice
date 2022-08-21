import { AddAccountRepository, PasswordHash } from '@src/data/protocols';

import { AddAccount } from '@src/domain/usecases';

type Dependencies = {
  readonly addAccountRepository: AddAccountRepository;
  readonly passwordHash: PasswordHash;
};

export type BuildDbAddAccount = (dependencies: Dependencies) => AddAccount;
