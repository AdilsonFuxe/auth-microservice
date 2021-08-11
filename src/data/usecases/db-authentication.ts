import { Authentication, AuthenticationParams } from '@/src/domain/usecases';
import {
  HashComparer,
  LoadAccountByEmailRepository,
} from '@/src/data/protocols';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
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
    }
    return null;
  }
}
