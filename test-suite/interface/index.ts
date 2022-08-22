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
import { Validation } from '@src/interface/protocols';
import { mockAccount } from '@test-suite/domain';

export const mockAddAccount = (): AddAccount => async () =>
  await Promise.resolve(mockAccount());

export const mockAuthentication = (): Authentication => async () =>
  await Promise.resolve('any_access_token');

export const mockForgotPassword = (): ForgotPassword => async () =>
  await Promise.resolve({
    accessToken: 123456,
    expiresIn: new Date(),
  });

export const mockLoadAccountByEmail = (): LoadAccountByEmail => async () =>
  await Promise.resolve(mockAccount());

export const mockLoadAccountById = (): LoadAccountById => async () =>
  await Promise.resolve(mockAccount());

export const mockLoadAccountByToken = (): LoadAccountByToken => async () =>
  await Promise.resolve(mockAccount());

export const mockSendMail = (): SendMail => async () => await Promise.resolve();

export const mockUpdatePassword = (): UpdatePassword => async () =>
  await Promise.resolve();

export const mockValidation = (): Validation => () => null;

export const mockSignout = (): Signout => async () => await Promise.resolve();
