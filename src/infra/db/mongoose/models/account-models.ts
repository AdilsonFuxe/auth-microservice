import { model, Schema } from 'mongoose';
import {
  AccountDocument,
  AccountMongooseModel,
  Schemas,
} from './models-protocols';

const AccountSchema = new Schema<AccountDocument>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'password must be at least 6 characters'],
    },
    accessToken: {
      type: String,
    },
    forgotPasswordAccessToken: {
      type: Number,
    },
    forgotPasswordExpiresIn: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default model<AccountDocument, AccountMongooseModel>(
  Schemas.account,
  AccountSchema
);
