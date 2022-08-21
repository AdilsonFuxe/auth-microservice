import { RemoteSendMail } from '@src/data/protocols';
import { SendMail } from '@src/domain/usecases';

type Dependencies = {
  remoteSendMail: RemoteSendMail;
};

export type BuildSendMail = (dependencies: Dependencies) => SendMail;
