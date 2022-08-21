import { sendMail } from '@src/data/usecases';
import { mockRemoteSendMail } from '@test-suite/data';
import faker from 'faker';

const makeSut = () => {
  const mockParams = () => ({
    to: faker.internet.email(),
    subject: faker.random.word(),
    text: faker.random.word(),
  });
  const remoteSendMail = jest.fn(mockRemoteSendMail());
  const sut = sendMail({ remoteSendMail });
  return {
    sut,
    remoteSendMail,
    mockParams,
  };
};

describe('SendMail Usecase', () => {
  it('Should calls NodeMailerSendMail with correct values', async () => {
    const { sut, remoteSendMail, mockParams } = makeSut();
    const params = mockParams();
    await sut(params);
    expect(remoteSendMail).toHaveBeenCalledWith(params);
  });

  it('Should throw if NodeMailerSendMail throws', async () => {
    const { sut, remoteSendMail, mockParams } = makeSut();
    remoteSendMail.mockRejectedValue(new Error());
    const promise = sut(mockParams());
    await expect(promise).rejects.toThrow();
  });
});
