import { AddAccount } from '@src/domain/usecases';

export type AddAccountRepository = (
  params: AddAccountRepository.Params
) => AddAccountRepository.Response;
export namespace AddAccountRepository {
  export type Params = AddAccount.Params;
  export type Response = AddAccount.Response;
}
