import { AccountModel } from '@src/domain/models';
import { Document, Model } from 'mongoose';

export type AccountDocument = AccountModel &
  Document & {
    id: Document['_id'];
  };

export type AccountMongooseModel = Model<AccountDocument> & {
  id: Document['_id'];
};

export enum Schemas {
  account = 'Accounts',
}
