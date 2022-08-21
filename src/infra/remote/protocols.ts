import { RemoteSendMail } from '@src/data/protocols';

type Params = {
  from: string;
  host: string;
  port: number;
  user: string;
  pass: string;
};

export type BuildNodeMailerAdapter = (params: Params) => RemoteSendMail;
