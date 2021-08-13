import { NodeMailerSendMail } from '@src/data/protocols';

export const mockNodeMailerSendMail = (): NodeMailerSendMail => {
  class NodeMailerSendMailStub implements NodeMailerSendMail {
    async sendMail(): Promise<void> {
      Promise.resolve();
    }
  }
  return new NodeMailerSendMailStub();
};
