export interface UpdatePassword {
  updatePasseword: (id: string, password: string) => Promise<void>;
}
