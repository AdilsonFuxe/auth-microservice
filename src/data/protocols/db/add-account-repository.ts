import { AccountModel } from '@/src/domain/models';
import { AddAccountParams } from '@/src/domain/usecases';

export interface AddAccountRepository {
  add: (params: AddAccountParams) => Promise<AccountModel>;
}
