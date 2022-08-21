import { dbForgotPassword } from '@src/data/usecases';
import {
  mockGenerateAccessToken,
  mockUdateForgotPasswordAccessTokenRepository,
} from '@test-suite/data';
import { throwError } from '@test-suite/helper';

const makeSut = () => {
  const generateAccessToken = jest.fn(mockGenerateAccessToken());
  const updateForgotPasswordAccessTokenRepository = jest.fn(
    mockUdateForgotPasswordAccessTokenRepository()
  );
  const sut = dbForgotPassword({
    generateAccessToken,
    updateForgotPasswordAccessTokenRepository,
  });
  return {
    sut,
    generateAccessToken,
    updateForgotPasswordAccessTokenRepository,
  };
};

describe('DbForgotPassword UseCase', () => {
  it('Should call GenerateAccessToken', async () => {
    const { sut, generateAccessToken } = makeSut();
    await sut('any_id');
    expect(generateAccessToken).toHaveBeenCalledTimes(1);
  });

  it('Should throw if GenerateAccessToken throws', async () => {
    const { sut, generateAccessToken } = makeSut();
    generateAccessToken.mockImplementation(throwError);
    const promise = sut('any_id');
    await expect(promise).rejects.toThrow();
  });

  it('Should call UpdateForgotPasswordAccessTokenRepository with correct values', async () => {
    const { sut, updateForgotPasswordAccessTokenRepository } = makeSut();
    await sut('any_id');
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 5);
    expect(updateForgotPasswordAccessTokenRepository).toHaveBeenCalledWith(
      'any_id',
      {
        accessToken: 123456,
        expiresIn,
      }
    );
  });

  it('Should throw if UpdateForgotPasswordAccessTokenRepository throws', async () => {
    const { sut, updateForgotPasswordAccessTokenRepository } = makeSut();
    updateForgotPasswordAccessTokenRepository.mockRejectedValue(new Error());
    const promise = sut('any_id');
    await expect(promise).rejects.toThrow();
  });
});
