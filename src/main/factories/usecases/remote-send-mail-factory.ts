import { SendMail } from '@src/domain/usecases/send-mail';
import { RemoteSendMail } from '@src/data/usecases/remote-send-mail';
import { NodeMailerAdapter } from '@src/infra/remote/node-mailer-adapter';
import env from '@src/main/config/env';

export const makeRemoteSendMail = (): SendMail => {
  const nodeMailAdapter = new NodeMailerAdapter(
    env.smtpMail,
    env.smtpHost,
    parseInt(`${env.smtpPort}`),
    env.smtpUser,
    env.smtpPass
  );
  return new RemoteSendMail(nodeMailAdapter);
};
