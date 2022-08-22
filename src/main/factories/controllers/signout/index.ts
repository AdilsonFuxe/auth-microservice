import { signoutController } from '@src/interface/controllers';
import { Controller } from '@src/interface/protocols';
import { makeDbSignout } from '@src/main/factories/usecases';

export const makeSignoutController = (): Controller =>
  signoutController({
    signout: makeDbSignout(),
  });
