import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia
global.matchMedia = global.matchMedia || function (query: string) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as MediaQueryList;
};

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock document.documentElement methods
Object.defineProperty(document.documentElement, 'classList', {
  value: {
    add: vi.fn(),
    remove: vi.fn(),
    contains: vi.fn(),
    toggle: vi.fn(),
  },
  writable: true,
});

Object.defineProperty(document.documentElement, 'setAttribute', {
  value: vi.fn(),
  writable: true,
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock console methods
vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});

// Reset all mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});
