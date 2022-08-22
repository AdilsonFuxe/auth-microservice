import {
  dbAddAccount,
  dbAuthentication,
  dbForgotPassword,
  dbLoadAccountByEmail,
  dbLoadAccountById,
  dbLoadAccountByToken,
  dbSignout,
  dbUpdatePassword,
  sendMail,
} from '@src/data/usecases';
import {
  AddAccount,
  Authentication,
  ForgotPassword,
  LoadAccountByEmail,
  LoadAccountById,
  LoadAccountByToken,
  SendMail,
  Signout,
  UpdatePassword,
} from '@src/domain/usecases';
import {
  bcryptHashPasswordHashAdapter,
  bcryptPasswordHashCompareAdapter,
  generateAccessTokenAdapter,
  jwtEncryptAdapter,
} from '@src/infra/cryptography';
import {
  addAccountRepository,
  loadAccountByEmailRepository,
  loadAccountByTokenRepository,
  updateAccessTokenRepository,
  updateForgotPasswordAccessTokenRepository,
  loadAccountByIdRepository,
  updatePasswordRepository,
  signoutRepository,
} from '@src/infra/db/mongoose/repositories';
import { nodeMailerAdapter } from '@src/infra/remote';
import env from '@src/main/config/env';

export const makeDbAddAccount = (): AddAccount =>
  dbAddAccount({
    passwordHash: bcryptHashPasswordHashAdapter(env.salt),
    addAccountRepository,
  });

export const makeDbAuthentication = (): Authentication =>
  dbAuthentication({
    passwordHashCompare: bcryptPasswordHashCompareAdapter,
    encrypt: jwtEncryptAdapter(env.jwtSecret),
    loadAccountByEmailRepository,
    updateAccessTokenRepository,
  });

export const makeDbForgotPassword = (): ForgotPassword =>
  dbForgotPassword({
    generateAccessToken: generateAccessTokenAdapter,
    updateForgotPasswordAccessTokenRepository,
  });

export const makeDbLoadAccountByEmail = (): LoadAccountByEmail =>
  dbLoadAccountByEmail({
    loadAccountByEmailRepository,
  });

export const makeDbLoadAccountById = (): LoadAccountById =>
  dbLoadAccountById({
    loadAccountByIdRepository,
  });

export const makeDbLoadAccountByToken = (): LoadAccountByToken =>
  dbLoadAccountByToken({
    loadAccountByTokenRepository,
    decrypt: jwtEncryptAdapter(env.jwtSecret),
  });

export const makeDbUpdatePassword = (): UpdatePassword =>
  dbUpdatePassword({
    passwordHash: bcryptHashPasswordHashAdapter(env.salt),
    updatePasswordRepository,
  });

export const makeSendMail = (): SendMail =>
  sendMail({
    remoteSendMail: nodeMailerAdapter({
      from: env.smtpMail,
      host: env.smtpHost,
      port: parseInt(`${env.smtpPort}`),
      user: env.smtpUser,
      pass: env.smtpPass,
    }),
  });

export const makeDbSignout = (): Signout => dbSignout({ signoutRepository });
