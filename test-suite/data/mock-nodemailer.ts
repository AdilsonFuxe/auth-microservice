import nodemailer from 'nodemailer';

export const mockNodeMailer = (): jest.Mocked<typeof nodemailer> => {
  const mockedNodeMailer = nodemailer as jest.Mocked<typeof nodemailer>;
  return mockedNodeMailer;
};
