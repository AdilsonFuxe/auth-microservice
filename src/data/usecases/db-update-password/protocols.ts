import { PasswordHash, UpdatePasswordRepository } from '@src/data/protocols';
import { UpdatePassword } from '@src/domain/usecases';

type Dependencies = {
  updatePasswordRepository: UpdatePasswordRepository;
  passwordHash: PasswordHash;
};

export type BuildDbUpdatePassword = (
  dependencies: Dependencies
) => UpdatePassword;
