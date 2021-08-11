import { HttpResponse } from '@/src/presentation/protocols';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});
