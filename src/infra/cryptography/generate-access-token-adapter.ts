import { GenerateAccessToken } from '@src/data/protocols';

export const generateAccessTokenAdapter: GenerateAccessToken = () =>
  Math.floor(Math.random() * (999999 - 100000)) + 100000;
