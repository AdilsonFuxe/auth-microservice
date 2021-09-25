import { UpdatePassword } from '@src/domain/usecases/update-password';
import { Hasher } from '../protocols';
import { UpdatePasswordRepository } from '../protocols/db/update-password-repository';

export class DbUpdatePassword implements UpdatePassword {
  constructor(
    private readonly updatePasswordRepository: UpdatePasswordRepository,
    private readonly hasher: Hasher
  ) {}

  async updatePasseword(id: string, password: string): Promise<void> {
    const hashedPassword = await this.hasher.hash(password);
    await this.updatePasswordRepository.updatePassword(id, hashedPassword);
  }
}
