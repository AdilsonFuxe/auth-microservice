export class InvalidAccessTokenError extends Error {
  constructor() {
    super(`Invalid Access Token`);
    this.name = 'InvalidAccessTokenError';
  }
}
