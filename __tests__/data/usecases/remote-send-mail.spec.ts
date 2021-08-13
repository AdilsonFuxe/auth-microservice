import { NodeMailerSendMail } from '@src/data/protocols';
import { RemoteSendMail } from '@src/data/usecases/remote-send-mail';
import { mockNodeMailerSendMail } from '@test-suite/data';
import { mockSendMailParams } from '@test-suite/domain';
import { trhowError } from '@test-suite/helper';

type SutTypes = {
  sut: RemoteSendMail;
  nodeMailerSendMailStub: NodeMailerSendMail;
};

const makeSut = (): SutTypes => {
  const nodeMailerSendMailStub = mockNodeMailerSendMail();
  const sut = new RemoteSendMail(nodeMailerSendMailStub);
  return {
    sut,
    nodeMailerSendMailStub,
  };
};

describe('RemoteSendMail Usecase', () => {
  it('Should calls NodeMailerSendMail with correct values', async () => {
    const { sut, nodeMailerSendMailStub } = makeSut();
    const sendMailSpy = jest.spyOn(nodeMailerSendMailStub, 'sendMail');
    const params = mockSendMailParams();
    await sut.sendMail(params);
    expect(sendMailSpy).toHaveBeenCalledWith(params);
  });

  it('Should throw if NodeMailerSendMail throws', async () => {
    const { sut, nodeMailerSendMailStub } = makeSut();
    jest
      .spyOn(nodeMailerSendMailStub, 'sendMail')
      .mockImplementationOnce(trhowError);
    const promise = sut.sendMail(mockSendMailParams());
    await expect(promise).rejects.toThrow();
  });
});
