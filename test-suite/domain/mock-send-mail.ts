import { SendMailParams } from '@src/domain/usecases/send-mail';
import faker from 'faker';

export const mockSendMailParams = (): SendMailParams => ({
  to: faker.internet.email(),
  from: faker.internet.email(),
  subject: faker.random.word(),
  text: faker.random.words(),
});
