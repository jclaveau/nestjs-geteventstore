import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['.'],
  testRegex: '.*\\.(e2e-spec|spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // collectCoverageFrom: ['src/server/**/*.(t|j)s'],
  // coveragePathIgnorePatterns: ['src/server/console', 'src/server/migration'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  rootDir: ".",
  moduleNameMapper: {
    "@nestjs-geteventstore/(.*)": "<rootDir>/../src/$1",
  }
};

export default config;
