import { RemoteSendMail } from '@src/data/protocols';
import { nodeMailerAdapter } from '@src/infra/remote/node-mailer-adapter';
import { mockNodeMailer, throwError } from '@test-suite/helper';
import nodemailer from 'nodemailer';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {}),
  }),
}));

type SutTypes = {
  sut: RemoteSendMail;
  mockedNodeMailer: jest.Mocked<typeof nodemailer>;
  mockParams: () => RemoteSendMail.Params;
};

const makeSut = (): SutTypes => {
  const mockParams = (): RemoteSendMail.Params => ({
    to: 'john.doe@mail.com.br',
    subject: 'This is a test',
    text: 'This is a test',
  });
  const mockedNodeMailer = mockNodeMailer();
  const sut = nodeMailerAdapter({
    from: 'server.mail@mail.com',
    host: 'localhost',
    port: 1234,
    user: 'any_user',
    pass: 'any_pass',
  });
  return { sut, mockedNodeMailer, mockParams };
};

describe('NodeMailerAdapter', () => {
  it('Should call create transport with correct values', async () => {
    const { sut, mockedNodeMailer, mockParams } = makeSut();
    await sut(mockParams());
    expect(mockedNodeMailer.createTransport).toHaveBeenCalledWith({
      host: 'localhost',
      port: 1234,
      auth: {
        user: 'any_user',
        pass: 'any_pass',
      },
    });
  });

  it('Should call send Mail with correct values', async () => {
    const { sut, mockedNodeMailer, mockParams } = makeSut();
    const sendMailSpy = jest.spyOn(
      mockedNodeMailer.createTransport(),
      'sendMail'
    );
    const params = mockParams();
    await sut(params);
    expect(sendMailSpy).toHaveBeenCalledWith({
      from: 'server.mail@mail.com',
      ...params,
    });
  });

  it('Should throw if  send Mail throw', async () => {
    const { sut, mockedNodeMailer, mockParams } = makeSut();
    jest
      .spyOn(mockedNodeMailer.createTransport(), 'sendMail')
      .mockImplementation(throwError);
    const promise = sut(mockParams());
    await expect(promise).rejects.toThrow();
  });
});
