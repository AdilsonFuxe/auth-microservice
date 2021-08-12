import { Router } from 'express';
import { adaptRoute } from '@src/main/adapters';
import { makeSignupController } from '@src/main/factories/controllers/signup/signup-controller-fatory';
import { makeSignInController } from '../factories/controllers/signin/signin-controller-fatory';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()));
  router.post('/signin', adaptRoute(makeSignInController()));
};
