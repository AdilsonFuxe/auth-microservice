import { Express, Router } from 'express';
import accountRouter from '@src/main/routes/account-routes';

export default (app: Express): void => {
  const router = Router();
  accountRouter(router);
  app.use('/api/v1', router);
};
