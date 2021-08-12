import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
} from '@/src/data/protocols';
import { AccountModel } from '@/src/domain/models';
import { AddAccountParams } from '@/src/domain/usecases';
import { AccountMongooseModel } from '@/src/infra/db/mongoose/models';
import { MongoHelper } from '@/src/infra/db/mongoose/helper/mongo-helper';

export class AccountMongoRepository
  implements AddAccountRepository, LoadAccountByEmailRepository
{
  async add(params: AddAccountParams): Promise<AccountModel> {
    const doc = new AccountMongooseModel(params);
    await doc.save();
    const parsedDoc = JSON.parse(JSON.stringify(doc));
    return MongoHelper.serialize(parsedDoc);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const account = await AccountMongooseModel.findOne({ email }).lean();
    return MongoHelper.serialize(account);
  }
}
