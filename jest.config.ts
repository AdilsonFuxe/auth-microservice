export default {
  roots: ['<rootDir>/__tests__', '<rootDir>/src'],
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/**/protocols.ts',
    '!**/protocols/**',
    '!**/test/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  preset: '@shelf/jest-mongodb',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test-suite/(.*)': '<rootDir>/test-suite/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
