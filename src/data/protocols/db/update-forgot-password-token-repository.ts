export type UpdateForgotPasswordAccessTokenParams = {
  accessToken: number;
  expiresIn: Date;
};

export interface UpdateForgotPasswordAccessTokenRepository {
  updateForgotPasswordToken: (
    params: UpdateForgotPasswordAccessTokenParams
  ) => Promise<void>;
}
