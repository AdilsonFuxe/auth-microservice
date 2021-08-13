import { NodeMailerAdapter } from '@src/infra/remote/node-mailer-adapter';
import { mockSendMailParams } from '@test-suite/domain';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

const mockedNodeMailer = nodemailer as jest.Mocked<typeof nodemailer>;

const makeSut = (): NodeMailerAdapter =>
  new NodeMailerAdapter('localhost', 1234, 'any_user', 'any_pass');

describe('NodeMailerAdapter', () => {
  it('Should call create transport with correct values', async () => {
    const sut = makeSut();
    await sut.sendMail(mockSendMailParams());
    expect(mockedNodeMailer.createTransport).toHaveBeenCalledWith({
      host: 'localhost',
      port: 1234,
      auth: {
        user: 'any_user',
        pass: 'any_pass',
      },
    });
  });
});
