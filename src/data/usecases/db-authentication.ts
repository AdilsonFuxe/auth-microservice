import { Authentication, AuthenticationParams } from '@/src/domain/usecases';
import {
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository,
} from '@/src/data/protocols';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}
  async auth(params: AuthenticationParams): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      params.email
    );
    if (account) {
      const isValid = await this.hashComparer.compare(
        params.password,
        account.password
      );
      await this.encrypter.encrypt(account.id);
    }
    return null;
  }
}
