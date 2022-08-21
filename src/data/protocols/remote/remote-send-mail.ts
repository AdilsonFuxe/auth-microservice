import { SendMail } from '@src/domain/usecases';

export type RemoteSendMail = (
  params: RemoteSendMail.Params
) => RemoteSendMail.Response;

export namespace RemoteSendMail {
  export type Params = SendMail.Params;
  export type Response = SendMail.Response;
}
