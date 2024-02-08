const path = require('path');

const jestConfig = {
  rootDir: path.join(__dirname, '..'),
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './coverage',
      outputName: 'junit.xml',
    }],
  ],
  maxWorkers: 1,
  coverageThreshold: {
    global: {
      lines: 100,
      statements: 100,
      branches: 100,
      functions: 100,
    },
  },
};

module.exports = jestConfig;
