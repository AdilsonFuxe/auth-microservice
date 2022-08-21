import { meController } from '@src/presentation/controllers';
import { ok, serverError, unauthorized } from '@src/presentation/helpers/http';
import { HttpRequest } from '@src/presentation/protocols';
import { mockAccount } from '@test-suite/domain';
import { mockLoadAccountById } from '@test-suite/presentation';

const makeSut = () => {
  const mockHttpRequest = (): HttpRequest => ({
    accountId: 'account_id',
  });
  const loadAccountById = jest.fn(mockLoadAccountById());
  const sut = meController({
    loadAccountById,
  });
  return {
    sut,
    loadAccountById,
    mockHttpRequest,
  };
};

describe('MeController', () => {
  it('Should call LoadAccountById with correct id', async () => {
    const { sut, loadAccountById, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(loadAccountById).toHaveBeenCalledWith('account_id');
  });

  it('Should return 401 if LoadAccountById returns null', async () => {
    const { sut, loadAccountById, mockHttpRequest } = makeSut();
    loadAccountById.mockResolvedValue(null);
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('Should return 500 if LoadAccountById throws', async () => {
    const { sut, loadAccountById, mockHttpRequest } = makeSut();
    loadAccountById.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 200 if LoadAccountById returns an account', async () => {
    const { sut, mockHttpRequest } = makeSut();
    const httpResponse = await sut(mockHttpRequest());
    const { id, firstName, lastName, email } = mockAccount();
    expect(httpResponse).toEqual(ok({ id, firstName, lastName, email }));
  });
});
