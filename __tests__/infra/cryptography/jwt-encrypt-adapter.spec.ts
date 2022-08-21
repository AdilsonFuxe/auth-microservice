import { jwtEncryptAdapter } from '@src/infra/cryptography';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return await Promise.resolve('any_token');
  },
}));

const makeSut = () => jwtEncryptAdapter('secret');

describe('JwtEncryptAdapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut('any_id');
    expect(signSpy).toHaveBeenCalledWith({ accountId: 'any_id' }, 'secret');
  });

  it('Should return a token on sign success', async () => {
    const sut = makeSut();
    const token = await sut('any_id');
    expect(token).toBe('any_token');
  });

  it('Should throw if sign throws', async () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'sign').mockImplementationOnce(async () => {
      throw new Error();
    });
    const promise = sut('any_id');
    await expect(promise).rejects.toThrow();
  });
});
