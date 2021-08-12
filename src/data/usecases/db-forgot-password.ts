import { ForgotPassword } from '@src/domain/usecases/forgot-password';
import {
  GenerateAccessToken,
  UpdateForgotPasswordAccessTokenRepository,
} from '@src/data/protocols';

export class DbForgotPassword implements ForgotPassword {
  constructor(
    private readonly generateAccessToken: GenerateAccessToken,
    private readonly updateForgotPasswordAccessTokenRepository: UpdateForgotPasswordAccessTokenRepository
  ) {}

  async forgot(id: string): Promise<void> {
    const accessToken = this.generateAccessToken.generate();
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 5);
    await this.updateForgotPasswordAccessTokenRepository.updateForgotPasswordToken(
      {
        accessToken,
        expiresIn,
      }
    );
  }
}
