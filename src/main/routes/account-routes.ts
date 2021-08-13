import { Router } from 'express';
import { adaptRoute } from '@src/main/adapters';
import { makeSignupController } from '@src/main/factories/controllers/signup/signup-controller-fatory';
import { makeSignInController } from '@src/main/factories/controllers/signin/signin-controller-fatory';
import { makeMeController } from '@src/main/factories/controllers/me/me-controller-fatory';
import { auth } from '@src/main/config/auth';
import { makeForgotPasswordController } from '@src/main/factories/controllers/forgot-password/forgot-password-controller-fatory';
import { makeResetPasswordController } from '../factories/controllers/reset-password/reset-password-controller-fatory';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()));
  router.post('/signin', adaptRoute(makeSignInController()));
  router.get('/me', auth, adaptRoute(makeMeController()));
  router.patch('/forgot', adaptRoute(makeForgotPasswordController()));
  router.patch('/reset-password', adaptRoute(makeResetPasswordController()));
};
