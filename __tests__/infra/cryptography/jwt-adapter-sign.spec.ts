import { JwtAdapter } from '@/src/infra/cryptography/jwt-adapter';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token');
  },
}));

const makeSut = (): JwtAdapter => new JwtAdapter('secret');

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.encrypt('any_id');
    expect(signSpy).toHaveBeenCalledWith({ accountId: 'any_id' }, 'secret');
  });

  it('Should return a token on sign success', async () => {
    const sut = makeSut();
    const accessToken = await sut.encrypt('any_id');
    expect(accessToken).toBe('any_token');
  });

  it('Should throw if sign throws', async () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'sign').mockImplementationOnce(async () => {
      throw new Error();
    });
    const promise = sut.encrypt('any_id');
    await expect(promise).rejects.toThrow();
  });
});
