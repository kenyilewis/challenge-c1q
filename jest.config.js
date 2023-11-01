
module.exports = {
  coverageDirectory: "coverage",
  rootDir: "./src/tests",
  testEnvironment: "node",
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest'
    ],
  }
};
