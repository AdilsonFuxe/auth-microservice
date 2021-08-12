import { LoadAccountById } from '@src/domain/usecases/load-account-by-id';
import { MeController } from '@src/presentation/controllers/me-controller';
import { HttpRequest } from '@src/presentation/protocols';
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
});
