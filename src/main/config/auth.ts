import { adaptMiddleware } from '@src/main/adapters/express-middleware-adapter';
import { makeAuthMiddleware } from '@src/main/factories/middleware/auth-middleware-factory';

export const auth = adaptMiddleware(makeAuthMiddleware());
