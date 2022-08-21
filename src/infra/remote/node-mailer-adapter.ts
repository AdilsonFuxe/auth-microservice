import nodemailer from 'nodemailer';
import { BuildNodeMailerAdapter } from './protocols';

export const nodeMailerAdapter: BuildNodeMailerAdapter =
  ({ host, port, user, pass, from }) =>
  async ({ subject, text, to }) => {
    const transport = nodemailer.createTransport({
      host,
      port,
      auth: {
        user,
        pass,
      },
    });
    await transport.sendMail({ from, to, subject, text });
  };
