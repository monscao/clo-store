export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  // Test files matching pattern
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  
  // Module file extension
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Module path mapping (consistent with tsconfig.json)
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  
  // Settings File
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Collecting test coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts',
    '!src/pages/**',
    '!src/services/**',
    '!src/store/**',
    '!src/app.tsx',
    '!src/**/*.d.ts',
  ],
  
  // Coverage Directory
  coverageDirectory: 'coverage',
  
  // Conversion Configuration
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.app.json'
    }],
  },
  
  // Ignored folders
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/src/pages/',
    '/src/services/', 
    '/src/store/'
  ],

  // Configuration for vite
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  globals: {
    TextEncoder: TextEncoder,
    TextDecoder: TextDecoder,
  }
}