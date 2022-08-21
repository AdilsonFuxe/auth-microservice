import { LoadAccountByEmail } from '@src/domain/usecases';

export type LoadAccountByEmailRepository = (
  email: string
) => LoadAccountByEmailRepository.Response;

export namespace LoadAccountByEmailRepository {
  export type Response = LoadAccountByEmail.Response;
}
