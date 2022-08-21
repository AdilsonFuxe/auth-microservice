import {
  GenerateAccessToken,
  UpdateForgotPasswordAccessTokenRepository,
} from '@src/data/protocols';
import { ForgotPassword } from '@src/domain/usecases';

type Dependencies = {
  generateAccessToken: GenerateAccessToken;
  updateForgotPasswordAccessTokenRepository: UpdateForgotPasswordAccessTokenRepository;
};

export type BuildDbForgotPassword = (
  dependencies: Dependencies
) => ForgotPassword;
