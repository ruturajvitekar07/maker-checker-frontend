module.exports = {

  transformIgnorePatterns: [
    '/node_modules/(?!(my-library))' // Exclude all node_modules except 'my-library'
  ],

  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use Babel for transforming JavaScript files
    '^.+\\.css$': 'jest-transform-css' // Use a custom CSS transformation module
  },

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image files
    '\\.(css|less)$': 'identity-obj-proxy' // Use a CSS module identity object proxy
  },
  testMatch: ['**/?(*.)+(spec|test).js'],
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
