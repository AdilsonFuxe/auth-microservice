import { generateAccessTokenAdapter } from '@src/infra/cryptography';

const makeSut = () => generateAccessTokenAdapter;

describe('GenerateAccessTokenAdapter', () => {
  it('Should return 4 digit access token', () => {
    const sut = makeSut();
    const accessToken = sut();
    const response = accessToken >= 100000 && accessToken <= 999999;
    expect(response).toBeTruthy();
  });
});
