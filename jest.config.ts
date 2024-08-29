import type { Config } from 'jest';

const config: Config = {
  // множество разных настроек
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@api': '<rootDir>/src/utils/burger-api.ts' // Пример сопоставления
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts']
};

export default config;
