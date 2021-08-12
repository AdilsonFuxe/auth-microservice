import {
  GenerateAccessToken,
  UpdateForgotPasswordAccessTokenRepository,
} from '@src/data/protocols';
import { DbForgotPassword } from '@src/data/usecases/db-forgot-password';
import {
  mockGenerateAccessToken,
  mockUdateForgotPasswordAccessTokenRepository,
} from '@test-suite/data';
import { trhowError } from '@test-suite/helper';

type SutTypes = {
  sut: DbForgotPassword;
  generateAccessTokenSub: GenerateAccessToken;
  updateForgotPasswordTokenRepositoryStub: UpdateForgotPasswordAccessTokenRepository;
};

const makeSut = (): SutTypes => {
  const generateAccessTokenSub = mockGenerateAccessToken();
  const updateForgotPasswordTokenRepositoryStub =
    mockUdateForgotPasswordAccessTokenRepository();
  const sut = new DbForgotPassword(
    generateAccessTokenSub,
    updateForgotPasswordTokenRepositoryStub
  );
  return {
    sut,
    generateAccessTokenSub,
    updateForgotPasswordTokenRepositoryStub,
  };
};

describe('DbForgotPassword UseCase', () => {
  it('Should call GenerateAccessToken', async () => {
    const { sut, generateAccessTokenSub } = makeSut();
    const generateSpy = jest.spyOn(generateAccessTokenSub, 'generate');
    await sut.forgot('any_id');
    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('Should throw if GenerateAccessToken throws', async () => {
    const { sut, generateAccessTokenSub } = makeSut();
    jest
      .spyOn(generateAccessTokenSub, 'generate')
      .mockImplementationOnce(trhowError);
    const promise = sut.forgot('any_id');
    await expect(promise).rejects.toThrow();
  });

  it('Should call UpdateForgotPasswordAccessTokenRepository with correct values', async () => {
    const { sut, updateForgotPasswordTokenRepositoryStub } = makeSut();
    const updateAccessTokenSpy = jest.spyOn(
      updateForgotPasswordTokenRepositoryStub,
      'updateForgotPasswordToken'
    );
    await sut.forgot('any_id');
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 5);
    expect(updateAccessTokenSpy).toHaveBeenCalledWith({
      accessToken: 123456,
      expiresIn,
    });
  });
});
