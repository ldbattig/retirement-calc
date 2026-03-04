export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
    }],
    '^.+\\.svelte$': 'svelte-jester',
  },
  moduleNameMapper: {
    '^\\$lib(.*)$': '<rootDir>/src/lib$1',
  },
  extensionsToTreatAsEsm: ['.ts', '.svelte'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
