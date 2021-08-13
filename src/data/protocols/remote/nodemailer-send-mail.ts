import { SendMailParams } from '@src/domain/usecases/send-mail';

export interface NodeMailerSendMail {
  sendMail: (params: SendMailParams) => Promise<void>;
}
