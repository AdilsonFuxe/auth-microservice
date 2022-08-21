import { LoadAccountById } from '@src/domain/usecases';

export type LoadAccountByIdRepository = (
  id: string
) => LoadAccountByIdRepository.Response;

export namespace LoadAccountByIdRepository {
  export type Response = LoadAccountById.Response;
}
