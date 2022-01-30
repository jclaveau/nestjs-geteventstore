import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  "verbose": true,
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": "./",
  "testRegex": ".spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "globals": {
    "ts-jest": {
      "tsconfig": "./tsconfig.spec.json"
    }
  },
  "globalSetup": "./jest.setup.ts",
  "coverageDirectory": "../coverage",
  "testEnvironment": "node",
  "testPathIgnorePatterns": ["/examples/"]
};

export default config;
