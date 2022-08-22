import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByIdRepository,
  LoadAccountByTokenRepository,
  SignoutRepository,
  UpdateAccessTokenRepository,
  UpdateForgotPasswordAccessTokenRepository,
  UpdatePasswordRepository,
} from '@src/data/protocols/db';
import { AccountModel } from '@src/infra/db/mongoose/models';
import { MongoHelper } from '@src/infra/db/mongoose/helper/';

export const addAccountRepository: AddAccountRepository = async (params) => {
  const doc = new AccountModel(params);
  await doc.save();
  const parsedDoc = JSON.parse(JSON.stringify(doc));
  return MongoHelper.serialize(parsedDoc);
};

export const loadAccountByEmailRepository: LoadAccountByEmailRepository =
  async (email) => {
    const account = await AccountModel.findOne({ email }).lean();
    return MongoHelper.serialize(account);
  };

export const loadAccountByIdRepository: LoadAccountByIdRepository = async (
  id
) => {
  const account = await AccountModel.findById(id).lean();
  return MongoHelper.serialize(account);
};

export const loadAccountByTokenRepository: LoadAccountByTokenRepository =
  async (accessToken) => {
    const account = await AccountModel.findOne({ accessToken }).lean();
    return MongoHelper.serialize(account);
  };

export const updateAccessTokenRepository: UpdateAccessTokenRepository = async (
  id,
  token
) => {
  await AccountModel.findByIdAndUpdate(id, { accessToken: token });
};

export const updateForgotPasswordAccessTokenRepository: UpdateForgotPasswordAccessTokenRepository =
  async (id, params) => {
    const account = await AccountModel.findByIdAndUpdate(
      id,
      {
        forgotPasswordAccessToken: params.accessToken,
        forgotPasswordExpiresIn: params.expiresIn,
      },
      { new: true }
    ).lean();
    return MongoHelper.serialize(account);
  };

export const updatePasswordRepository: UpdatePasswordRepository = async (
  id,
  password
) => {
  await AccountModel.findByIdAndUpdate(id, {
    password,
    forgotPasswordExpiresIn: null,
    forgotPasswordAccessToken: null,
  });
};

export const signoutRepository: SignoutRepository = async (id) => {
  await AccountModel.findByIdAndUpdate(id, {
    accessToken: null,
  });
};
