/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  clearMocks: true,
  transform: {
    "^.+\\.tsx ? $": "ts-jest",
  },
  coverageProvider: "v8",
};

export default config;
