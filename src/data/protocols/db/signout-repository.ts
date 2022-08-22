import { Signout } from '@src/domain/usecases';

export type SignoutRepository = (
  accountId: string
) => SignoutRepository.Response;

export namespace SignoutRepository {
  export type Response = Signout.Response;
}
