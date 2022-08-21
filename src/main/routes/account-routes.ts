import { Router } from 'express';
import { adaptRoute } from '@src/main/adapters';
import {
  makeSignupController,
  makeForgotPasswordController,
  makeMeController,
  makeResetPasswordController,
  makeSignInController,
} from '@src/main/factories/controllers';
import { auth } from '@src/main/config/auth';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()));
  router.post('/signin', adaptRoute(makeSignInController()));
  router.get('/me', auth, adaptRoute(makeMeController()));
  router.patch('/forgot', adaptRoute(makeForgotPasswordController()));
  router.patch('/reset-password', adaptRoute(makeResetPasswordController()));
};
