import '@testing-library/jest-dom';

// Global test configuration
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Compatible with older versions
    removeListener: jest.fn(), // Compatible with older versions
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Global test timeout
jest.setTimeout(10000);