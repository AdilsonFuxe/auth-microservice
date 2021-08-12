import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@src/presentation/protocols';
import { serverError } from '@src/presentation/helpers/http/http-helper';
import { LoadAccountById } from '@src/domain/usecases/load-account-by-id';

export class MeController implements Controller {
  constructor(private readonly loadAccountById: LoadAccountById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadAccountById.loadById(httpRequest.accountId);
    } catch (error) {
      return serverError(error);
    }
  }
}
