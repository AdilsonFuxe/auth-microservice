export type UpdateForgotPasswordAccessTokenParams = {
  accessToken: number;
  expiresIn: Date;
};

export interface UpdateForgotPasswordAccessTokenRepository {
  updateForgotPasswordToken: (
    id: string,
    params: UpdateForgotPasswordAccessTokenParams
  ) => Promise<void>;
}
