import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';
import {
  forbidden,
  serverError,
} from '@src/presentation/helpers/http/http-helper';
import { LoadAccountById } from '@src/domain/usecases/load-account-by-id';
import { AccessDeniedError } from '../errors';

export class MeController implements Controller {
  constructor(private readonly loadAccountById: LoadAccountById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const account = await this.loadAccountById.loadById(
        httpRequest.accountId
      );
      if (!account) {
        return forbidden(new AccessDeniedError());
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
