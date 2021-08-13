import { SendMail } from '@src/domain/usecases/send-mail';

export const mockSendMail = (): SendMail => {
  class SendMailStub implements SendMail {
    async sendMail(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new SendMailStub();
};
