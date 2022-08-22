import { signinController } from '@src/interface/controllers';
import { MissingParamError } from '@src/interface/errors';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@src/interface/helpers/http';
import { HttpRequest } from '@src/interface/protocols';
import { mockAuthentication, mockValidation } from '@test-suite/interface';

const makeSut = () => {
  const mockHttpRequest = (): HttpRequest => ({
    body: {
      email: 'any_email@mail.com',
      password: 'any_password',
    },
  });
  const validation = jest.fn(mockValidation());
  const authentication = jest.fn(mockAuthentication());
  const sut = signinController({ validation, authentication });
  return {
    sut,
    validation,
    authentication,
    mockHttpRequest,
  };
};

describe('SignIn Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validation, mockHttpRequest } = makeSut();
    const httpRequest = mockHttpRequest();
    await sut(httpRequest);
    expect(validation).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validation, mockHttpRequest } = makeSut();
    validation.mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field'))
    );
  });

  it('Should call Authentication with correct values', async () => {
    const { sut, authentication, mockHttpRequest } = makeSut();
    await sut(mockHttpRequest());
    expect(authentication).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authentication, mockHttpRequest } = makeSut();
    authentication.mockRejectedValue(new Error());
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 401 if an invalid credentials are provided', async () => {
    const { sut, authentication, mockHttpRequest } = makeSut();
    authentication.mockResolvedValueOnce(null);
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut, mockHttpRequest } = makeSut();
    const httpResponse = await sut(mockHttpRequest());
    expect(httpResponse).toEqual(ok({ accessToken: 'any_access_token' }));
  });
});
