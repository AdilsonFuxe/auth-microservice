import {
  AddAccount,
  Authentication,
  LoadAccountByEmail,
} from '@src/domain/usecases';
import { Controller, Validation } from '@src/interface/protocols';

type Dependencies = {
  validation: Validation;
  addAccount: AddAccount;
  authentication: Authentication;
  loadAccountByEmail: LoadAccountByEmail;
};

export type BuildSignupController = (dependencies: Dependencies) => Controller;
