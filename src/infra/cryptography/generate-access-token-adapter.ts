import { GenerateAccessToken } from '@src/data/protocols';

export class GenerateAccessTokenAdapter implements GenerateAccessToken {
  generate(): number {
    return Math.floor(Math.random() * (999999 - 100000)) + 100000;
  }
}
