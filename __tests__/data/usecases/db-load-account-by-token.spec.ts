import { Decrypter } from '@src/data/protocols';
import { DbLoadAccountByToken } from '@src/data/usecases/db-load-account-by-token';
import { mockDecrypter } from '@test-suite/data';

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
};

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter();
  const sut = new DbLoadAccountByToken(decrypterStub);
  return {
    sut,
    decrypterStub,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.loadByToken('any_token');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });
});
