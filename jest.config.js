module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/jest/**',
    '!**/coverage/**',
    '!jest.config.js',
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
  testMatch: ['**/?(*.)+(jest).[jt]s?(x)'],
  testPathIgnorePatterns: ['/.next/', '/node_modules/', '/jest/', '/coverage/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
