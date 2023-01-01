import { model, Schema } from 'mongoose';
import {
  AccountDocument,
  AccountMongooseModel,
  Schemas,
} from './models-protocols';

const SessionSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

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
    sessions: {
      type: [SessionSchema],
      default: [],
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
