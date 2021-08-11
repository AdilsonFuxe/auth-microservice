import { Authentication, AuthenticationParams } from '@/src/domain/usecases';
import { LoadAccountByEmailRepository } from '@/src/data/protocols';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}
  async auth(params: AuthenticationParams): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(params.email);
    return Promise.resolve(null);
  }
}
