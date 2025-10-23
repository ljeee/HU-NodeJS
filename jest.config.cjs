/** @type {import('jest').Config} */
module.exports = {
  // Modo CommonJS para permitir jest.mock tradicional y imports estáticos
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],

  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/__test__/**/*.test.ts'],
  moduleFileExtensions: ['ts','js','json'],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,// soporta ES Modules
      },
    ],
  },
  // mapear import con .js para jest encuentre el .ts real
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  verbose: false
};

