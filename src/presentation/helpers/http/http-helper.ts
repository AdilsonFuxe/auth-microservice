import { HttpResponse, HttpStatusCode } from '@/src/presentation/protocols';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  body: error,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.forbidden,
  body: error,
});
