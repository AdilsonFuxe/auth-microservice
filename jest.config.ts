export default {
  roots: ['<rootDir>/__tests__'],
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts}'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/src/(.*)': '<rootDir>/src/$1',
  },
};
