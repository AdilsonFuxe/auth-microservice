import {
  AddAccountRepository,
  Decrypt,
  Encrypt,
  GenerateAccessToken,
  LoadAccountByEmailRepository,
  LoadAccountByIdRepository,
  LoadAccountByTokenRepository,
  PasswordHash,
  PasswordHashCompare,
  RemoteSendMail,
  UpdateAccessTokenRepository,
  UpdateForgotPasswordAccessTokenRepository,
  UpdatePasswordRepository,
} from '@src/data/protocols';
import { mockAccount } from '@test-suite/domain';

export const mockAddAccountRepository = (): AddAccountRepository => async () =>
  await Promise.resolve(mockAccount());

export const mockUpdateAccessTokenRepository =
  (): UpdateAccessTokenRepository => async () =>
    await Promise.resolve();

export const mockLoadAccountByEmailRepository =
  (): LoadAccountByEmailRepository => async () =>
    await Promise.resolve(mockAccount());

export const mockLoadAccountByIdRepository =
  (): LoadAccountByIdRepository => async () =>
    await Promise.resolve(mockAccount());

export const mockLoadAccountByTokenRepository =
  (): LoadAccountByTokenRepository => async () =>
    await Promise.resolve(mockAccount());

export const mockUdateForgotPasswordAccessTokenRepository =
  (): UpdateForgotPasswordAccessTokenRepository => async () =>
    await Promise.resolve(mockAccount());

export const mockUpdatePasswordRepository =
  (): UpdatePasswordRepository => async () =>
    await Promise.resolve();

export const mockRemoteSendMail = (): RemoteSendMail => async () =>
  await Promise.resolve();

export const mockPasswordHash = (): PasswordHash => async () =>
  await Promise.resolve('hashed_password');

export const mockPasswordHashCompare = (): PasswordHashCompare => async () =>
  await Promise.resolve(true);

export const mockEncrypt = (): Encrypt => async () =>
  await Promise.resolve('any_token');

export const mockDecrypt = (): Decrypt => async () =>
  await Promise.resolve('any_value');

export const mockGenerateAccessToken = (): GenerateAccessToken => () => 123456;
