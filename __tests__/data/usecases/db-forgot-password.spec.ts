import { GenerateAccessToken } from '@src/data/protocols/criptography/generate-accessToken';
import { DbForgotPassword } from '@src/data/usecases/db-forgot-password';
import { mockGenerateAccessToken } from '@test-suite/data';

type SutTypes = {
  sut: DbForgotPassword;
  generateAccessTokenSub: GenerateAccessToken;
};

const makeSut = (): SutTypes => {
  const generateAccessTokenSub = mockGenerateAccessToken();
  const sut = new DbForgotPassword(generateAccessTokenSub);
  return {
    sut,
    generateAccessTokenSub,
  };
};

describe('DbForgotPassword UseCase', () => {
  it('Should call GenerateAccessToken', async () => {
    const { sut, generateAccessTokenSub } = makeSut();
    const generateSpy = jest.spyOn(generateAccessTokenSub, 'generate');
    await sut.forgot('any_id');
    expect(generateSpy).toHaveBeenCalledTimes(1);
  });
});
