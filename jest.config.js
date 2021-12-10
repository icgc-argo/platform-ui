// to avoid collision with other libraries:
// - jest is configured to use the /jest/ folder
// - test files are in /__tests__/ files

module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.[jt]s?(x)',
    '!**/node_modules/**',
    '!**/jest/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!**/.next/**',
    '!**/uikit/**',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/jest/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/fileMock.js',
  },
  setupFiles: ['<rootDir>/jest/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupAfterEnv.js'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/.next/', '/node_modules/', '/jest/', '/coverage/', '/uikit/'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  preset: 'ts-jest',
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^global(.*)$': '<rootDir>/global$1',
  },
};
