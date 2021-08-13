export type SendMailParams = {
  to: string;
  subject: string;
  text: string;
};

export interface SendMail {
  sendMail: (params: SendMailParams) => Promise<void>;
}
