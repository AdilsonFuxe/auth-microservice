import { UpdatePassword } from '@src/domain/usecases/update-password';
import { UpdatePasswordRepository } from '../protocols/db/update-password-repository';

export class DbUpdatePassword implements UpdatePassword {
  constructor(
    private readonly updatePasswordRepository: UpdatePasswordRepository
  ) {}

  async updatePasseword(id: string, password: string): Promise<void> {
    await this.updatePasswordRepository.updatePassword(id, password);
  }
}
