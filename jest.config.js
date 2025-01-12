module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript files
    testEnvironment: 'node', // Run tests in a Node.js environment
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files with ts-jest
    },
    moduleFileExtensions: ['js', 'ts', 'tsx'], // Recognize .ts and .tsx files
    testMatch: [
      "**/?(*.)+(spec|test).[tj]s?(x)" // Recognize .test.ts or .spec.ts files
    ],
    transformIgnorePatterns: [
      "node_modules/(?!(some-module|another-module)/)" // If you need to transform any module from node_modules
    ],

    setupFiles: ['<rootDir>/jest.setup.js'],
      
  };
  