import { UpdatePassword } from '@src/domain/usecases';

export type UpdatePasswordRepository = (
  id: string,
  password: string
) => UpdatePasswordRepository.Response;

export namespace UpdatePasswordRepository {
  export type Response = UpdatePassword.Response;
}
