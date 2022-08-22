import { Controller, HttpRequest } from '@src/interface/protocols';
import { serverError } from '../http';

type GenericFunction<T> = (...arg: T[]) => Controller;

function tryCatch<T>(fn: GenericFunction<T>) {
  return (...props: T[]) =>
    async (httpRequest: HttpRequest) => {
      try {
        return await fn(...props)(httpRequest);
      } catch (error: any) {
        return serverError(error);
      }
    };
}

export { tryCatch };
