import { Authentication, AuthenticationParams } from '@src/domain/usecases';
import {
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository,
  UpdateAcessTokenRepository,
} from '@src/data/protocols';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAcessTokenRepository: UpdateAcessTokenRepository
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
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAcessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        );
        return accessToken;
      }
    }
    return null;
  }
}
