import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByIdlRepository,
  LoadAccountByTokenRepository,
  UpdateAcessTokenRepository,
  UpdateForgotPasswordAccessTokenParams,
  UpdateForgotPasswordAccessTokenRepository,
} from '@src/data/protocols';
import { AccountModel } from '@src/domain/models';
import { AddAccountParams } from '@src/domain/usecases';
import { AccountMongooseModel } from '@src/infra/db/mongoose/models';
import { MongoHelper } from '@src/infra/db/mongoose/helper/mongo-helper';

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAcessTokenRepository,
    LoadAccountByIdlRepository,
    LoadAccountByTokenRepository,
    UpdateForgotPasswordAccessTokenRepository
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

  async updateAccessToken(id: string, token: string): Promise<void> {
    await AccountMongooseModel.findByIdAndUpdate(id, { accessToken: token });
  }

  async loadById(id: string): Promise<AccountModel> {
    const account = await AccountMongooseModel.findById(id).lean();
    return MongoHelper.serialize(account);
  }

  async loadByToken(accessToken: string): Promise<AccountModel> {
    const account = await AccountMongooseModel.findOne({ accessToken }).lean();
    return MongoHelper.serialize(account);
  }

  async updateForgotPasswordToken(
    id: string,
    params: UpdateForgotPasswordAccessTokenParams
  ): Promise<void> {
    await AccountMongooseModel.findByIdAndUpdate(id, {
      forgotPasswordAccessToken: params.accessToken,
      forgotPasswordExpiresIn: params.expiresIn,
    });
  }
}
