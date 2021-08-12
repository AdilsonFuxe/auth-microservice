import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  async verify(): Promise<string | any> {
    return Promise.resolve({ accountId: 'any_value' });
  },
}));

const makeSut = (): JwtAdapter => new JwtAdapter('secret');

describe('Jwt Adapter', () => {
  it('Should call verify with correct values', async () => {
    const sut = makeSut();
    const verifySpy = jest.spyOn(jwt, 'verify');
    await sut.decrypt('any_token');
    expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret');
  });

  it('Should return an value on verify success', async () => {
    const sut = makeSut();
    const value = await sut.decrypt('any_token');
    expect(value).toBe('any_value');
  });

  it('Should throw if verify throws', async () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'verify').mockImplementationOnce(async () => {
      throw new Error();
    });
    const promise = sut.decrypt('any_token');
    await expect(promise).rejects.toThrow();
  });
});
