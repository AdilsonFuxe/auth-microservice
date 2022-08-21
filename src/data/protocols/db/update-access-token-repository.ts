export type UpdateAccessTokenRepository = (
  id: string,
  token: string
) => UpdateAccessTokenRepository.Response;

export namespace UpdateAccessTokenRepository {
  export type Response = Promise<void>;
}
