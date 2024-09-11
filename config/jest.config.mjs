export default {
  rootDir: process.cwd(),
  testPathIgnorePatterns: [
    '/dist/',
    '/coverage/',
    '/config/',
  ],
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,js,cjs,mjs}'],
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
      lines: 20,
      statements: 20,
      branches: 20,
      functions: 20,
    },
  },
  preset: 'ts-jest',
};
