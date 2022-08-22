import { ok, serverError, unauthorized } from '@src/interface/helpers/http';
import { authMiddleware } from '@src/interface/middlewares';
import { HttpRequest } from '@src/interface/protocols';
import { mockLoadAccountByToken } from '@test-suite/interface';

const makeSut = (role?: string) => {
  const mockHttpRequest = (): HttpRequest => ({
    headers: {
      'x-access-token': 'Bearer any_token',
    },
  });
  const loadAccountByToken = jest.fn(mockLoadAccountByToken());
  const sut = authMiddleware({ loadAccountByToken });
  return {
    sut,
    loadAccountByToken,
    mockHttpRequest,
  };
};

describe('Auth Middleware', () => {
  it('Should return 401 if no headers are found', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut({});
    expect(httpResponse).toEqual(unauthorized());
  });

  it('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByToken, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(loadAccountByToken).toHaveBeenCalledWith('any_token');
  });

  it('Should return 401 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByToken, mockHttpRequest } = makeSut();
    loadAccountByToken.mockResolvedValue(null);
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByToken, mockHttpRequest } = makeSut();
    loadAccountByToken.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, mockHttpRequest } = makeSut();
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }));
  });
});
