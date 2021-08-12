import { BcryptAdapter } from '@/src/infra/cryptography';
import bcrypt from 'bcrypt';

const salt = 12;
const makeSut = (): BcryptAdapter => new BcryptAdapter(salt);

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash');
  },
}));

describe('Bcrypt Adapter Hash', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
});
