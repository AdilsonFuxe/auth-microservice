import { LoadAccountByToken } from '@src/domain/usecases';

export type LoadAccountByTokenRepository = (
  accessToken: string
) => LoadAccountByTokenRepository.Response;

export namespace LoadAccountByTokenRepository {
  export type Response = LoadAccountByToken.Response;
}
