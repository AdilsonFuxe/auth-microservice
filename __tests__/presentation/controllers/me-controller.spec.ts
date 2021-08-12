import { LoadAccountById } from '@src/domain/usecases/load-account-by-id';
import { MeController } from '@src/presentation/controllers/me-controller';
import { AccessDeniedError } from '@src/presentation/errors';
import {
  forbidden,
  serverError,
} from '@src/presentation/helpers/http/http-helper';
import { HttpRequest } from '@src/presentation/protocols';
import { trhowError } from '@test-suite/helper';
import { mockLoadAccountById } from '@test-suite/presentation';

const mockHttpRequest = (): HttpRequest => ({
  accountId: 'account_id',
});

type SutTypes = {
  sut: MeController;
  loadAccountByIdStub: LoadAccountById;
};

const makeSut = (): SutTypes => {
  const loadAccountByIdStub = mockLoadAccountById();
  const sut = new MeController(loadAccountByIdStub);
  return {
    sut,
    loadAccountByIdStub,
  };
};

describe('MeController', () => {
  it('Should call LoadAccountById with correct id', async () => {
    const { sut, loadAccountByIdStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByIdStub, 'loadById');
    await sut.handle(mockHttpRequest());
    expect(loadSpy).toHaveBeenCalledWith('account_id');
  });

  it('Should return 403 if LoadAccountById returns null', async () => {
    const { sut, loadAccountByIdStub } = makeSut();
    jest
      .spyOn(loadAccountByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  it('Should return 500 if LoadAccountById throws', async () => {
    const { sut, loadAccountByIdStub } = makeSut();
    jest
      .spyOn(loadAccountByIdStub, 'loadById')
      .mockImplementationOnce(trhowError);
    const httpResponse = await sut.handle(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
