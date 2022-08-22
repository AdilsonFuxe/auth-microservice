import { HttpResponse, HttpStatusCode } from '@src/interface/protocols';
import {
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from '@src/interface/errors';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  body: error,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.serverError,
  body: new ServerError(error.stack),
});

export const ok = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.ok,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.created,
  body: data,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: HttpStatusCode.unauthorized,
  body: new UnauthorizedError(),
});

export const notFoundError = (paramName: string): HttpResponse => ({
  statusCode: HttpStatusCode.notFound,
  body: new NotFoundError(paramName),
});

export const noContent = (): HttpResponse => ({
  statusCode: HttpStatusCode.noContent,
});
