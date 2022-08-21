export type SendMail = (params: SendMail.Params) => SendMail.Response;

export namespace SendMail {
  export type Params = {
    to: string;
    subject: string;
    text: string;
  };
  export type Response = Promise<void>;
}
