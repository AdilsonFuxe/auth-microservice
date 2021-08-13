export interface UpdatePasswordRepository {
  updatePassword: (id: string, password: string) => Promise<void>;
}
