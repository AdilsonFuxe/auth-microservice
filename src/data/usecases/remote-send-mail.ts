import { SendMail, SendMailParams } from '@src/domain/usecases/send-mail';
import { NodeMailerSendMail } from '@src/data/protocols';

export class RemoteSendMail implements SendMail {
  constructor(private nodeMailerSendMail: NodeMailerSendMail) {}

  async sendMail(params: SendMailParams): Promise<void> {
    await this.nodeMailerSendMail.sendMail(params);
  }
}
