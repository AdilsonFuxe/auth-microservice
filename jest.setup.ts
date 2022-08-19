import mockDate from 'mockdate';

beforeAll(() => {
  mockDate.set(new Date());
});

afterAll(async () => {
  mockDate.reset();
});
