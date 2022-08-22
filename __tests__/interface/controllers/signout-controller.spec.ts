import { signoutController } from '@src/interface/controllers';
import { noContent, serverError } from '@src/interface/helpers';
import { HttpRequest } from '@src/interface/protocols';
import { mockSignout } from '@test-suite/interface';

const makeSut = () => {
  const mockHttpRequest = (): HttpRequest => ({
    accountId: 'any_account_id',
  });
  const signout = jest.fn(mockSignout());
  const sut = signoutController({ signout });
  return { sut, signout, mockHttpRequest };
};

describe('SignoutController', () => {
  it('Should call signout with correct accountId', async () => {
    const { sut, signout, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(signout).toHaveBeenCalledWith('any_account_id');
  });

  it('Should return 500 if signout throws', async () => {
    const { sut, signout, mockHttpRequest } = makeSut();
    signout.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 204 on success', async () => {
    const { sut, mockHttpRequest } = makeSut();
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
