import { NodeMailerAdapter } from '@src/infra/remote/node-mailer-adapter';
import { mockNodeMailer } from '@test-suite/data';
import { mockSendMailParams } from '@test-suite/domain';
import { trhowError } from '@test-suite/helper';
import nodemailer from 'nodemailer';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {}),
  }),
}));

type SutTypes = {
  sut: NodeMailerAdapter;
  mockedNodeMailer: jest.Mocked<typeof nodemailer>;
};

const makeSut = (): SutTypes => {
  const mockedNodeMailer = mockNodeMailer();
  const sut = new NodeMailerAdapter(
    'server.mail@mail.com',
    'localhost',
    1234,
    'any_user',
    'any_pass'
  );
  return { sut, mockedNodeMailer };
};

describe('NodeMailerAdapter', () => {
  it('Should call create transport with correct values', async () => {
    const { sut, mockedNodeMailer } = makeSut();
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

  it('Should call send Mail with correct values', async () => {
    const { sut, mockedNodeMailer } = makeSut();
    const sendMailSpy = jest.spyOn(
      mockedNodeMailer.createTransport(),
      'sendMail'
    );
    const params = mockSendMailParams();
    await sut.sendMail(params);
    expect(sendMailSpy).toHaveBeenCalledWith({
      from: 'server.mail@mail.com',
      ...params,
    });
  });

  it('Should throw if  send Mail throw', async () => {
    const { sut, mockedNodeMailer } = makeSut();
    jest
      .spyOn(mockedNodeMailer.createTransport(), 'sendMail')
      .mockImplementation(trhowError);
    const promise = sut.sendMail(mockSendMailParams());
    await expect(promise).rejects.toThrow();
  });
});
