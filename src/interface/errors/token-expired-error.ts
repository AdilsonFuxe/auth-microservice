export class TokenExpiredError extends Error {
  constructor() {
    super(`Token Expired, please generate a new one`);
    this.name = 'TokenExpiredError';
  }
}
