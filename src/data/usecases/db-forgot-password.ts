import { ForgotPassword } from '@src/domain/usecases/forgot-password';
import { GenerateAccessToken } from '../protocols/criptography/generate-accessToken';

export class DbForgotPassword implements ForgotPassword {
  constructor(private readonly generateAccessToken: GenerateAccessToken) {}

  async forgot(id: string): Promise<void> {
    this.generateAccessToken.generate();
  }
}
