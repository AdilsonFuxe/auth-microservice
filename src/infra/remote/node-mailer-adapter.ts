import { NodeMailerSendMail } from '@src/data/protocols';
import { SendMailParams } from '@src/domain/usecases/send-mail';
import nodemailer from 'nodemailer';

export class NodeMailerAdapter implements NodeMailerSendMail {
  constructor(
    private readonly from: string,
    private readonly host: string,
    private readonly port: number,
    private readonly user: string,
    private readonly pass: string
  ) {}
  async sendMail(params: SendMailParams): Promise<void> {
    const transport = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
    await transport.sendMail({
      from: this.from,
      to: params.to,
      subject: params.subject,
      text: params.text,
    });
  }
}
