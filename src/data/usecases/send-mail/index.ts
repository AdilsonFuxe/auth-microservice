import { BuildSendMail } from './protocols';

export const sendMail: BuildSendMail =
  ({ remoteSendMail }) =>
  async (params) => {
    await remoteSendMail(params);
  };
