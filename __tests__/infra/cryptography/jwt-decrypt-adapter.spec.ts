import { jwtDecryptAdapter } from '@src/infra/cryptography';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  async verify(): Promise<any> {
    return await Promise.resolve({ accountId: 'valid_id' });
  },
}));

const makeSut = () => jwtDecryptAdapter('secret');

describe('JwtDecryptAdapter', () => {
  it('Should calls verify with correct params', async () => {
    const sut = makeSut();
    const verifySpy = jest.spyOn(jwt, 'verify');
    await sut('any_token');
    expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret');
  });

  it('Should return a valid account id on verify success', async () => {
    const sut = makeSut();
    const value = await sut('any_token');
    expect(value).toEqual('valid_id');
  });

  it('Should throw if verify throws', async () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'verify').mockImplementationOnce(async () => {
      throw new Error();
    });
    const promise = sut('any_token');
    await expect(promise).rejects.toThrow();
  });
});
