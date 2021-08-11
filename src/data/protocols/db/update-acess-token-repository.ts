export interface UpdateAcessTokenRepository {
  updateAcessToken: (id: string, token: string) => Promise<void>;
}
