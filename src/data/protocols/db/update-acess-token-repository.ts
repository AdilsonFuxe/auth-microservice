export interface UpdateAcessTokenRepository {
  updateAccessToken: (id: string, token: string) => Promise<void>;
}
