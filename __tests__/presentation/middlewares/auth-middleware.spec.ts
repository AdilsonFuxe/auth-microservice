import { LoadAccountByToken } from '@src/domain/usecases/load-account-by-token';
import { AccessDeniedError } from '@src/presentation/errors';
import {
  forbidden,
  ok,
  serverError,
} from '@src/presentation/helpers/http/http-helper';
import { AuthMiddleware } from '@src/presentation/middlewares/auth-middleware';
import { HttpRequest } from '@src/presentation/protocols';
import { trhowError } from '@test-suite/helper';
import { mockLoadAccountByToken } from '@test-suite/presentation';

const mockHttpRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
});

type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByToken;
};

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub);
  return {
    sut,
    loadAccountByTokenStub,
  };
};

describe('Auth Middleware', () => {
  test('Should return 403 if no headers are found', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'loadByToken');
    await sut.handle(mockHttpRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenStub, 'loadByToken')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }));
  });

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenStub, 'loadByToken')
      .mockImplementationOnce(trhowError);
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
