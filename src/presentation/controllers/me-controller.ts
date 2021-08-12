import {
  HttpRequest,
  HttpResponse,
  Middleware,
} from '@src/presentation/protocols';
import {
  forbidden,
  ok,
  serverError,
} from '@src/presentation/helpers/http/http-helper';
import { LoadAccountById } from '@src/domain/usecases/load-account-by-id';
import { AccessDeniedError } from '../errors';

export class MeController implements Middleware {
  constructor(private readonly loadAccountById: LoadAccountById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const account = await this.loadAccountById.loadById(
        httpRequest.accountId
      );
      if (!account) {
        return forbidden(new AccessDeniedError());
      }
      const { id, firstName, lastName, email } = account;
      return ok({ id, firstName, lastName, email });
    } catch (error) {
      return serverError(error);
    }
  }
}
