import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';

// Mock the colorTokens module
vi.mock('../../styles/colorTokens', () => ({
  uiColors: {
    toggle: {
      dark: {
        bg: 'bg-white/10',
        text: 'text-yellow-400',
        border: 'border-yellow-400/30',
        hoverBg: 'hover:bg-white/20',
        hoverShadow: 'hover:shadow-test',
      },
      light: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        hoverBg: 'hover:bg-indigo-200',
        hoverShadow: 'hover:shadow-test',
      },
    },
  },
}));

describe('ThemeToggle', () => {
  let localStorageMock: { [key: string]: string };
  let classListMock: {
    add: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    localStorageMock = {};
    classListMock = {
      add: vi.fn(),
      remove: vi.fn(),
    };

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => localStorageMock[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete localStorageMock[key];
        }),
      },
      writable: true,
    });

    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: classListMock,
        setAttribute: vi.fn(),
      },
      writable: true,
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<ThemeToggle />);
    // Initially shows placeholder while mounting
    expect(document.body).toBeInTheDocument();
  });

  it('should read theme from localStorage on mount', async () => {
    localStorageMock['theme'] = 'light';
    
    await act(async () => {
      render(<ThemeToggle />);
    });

    await waitFor(() => {
      expect(window.localStorage.getItem).toHaveBeenCalledWith('theme');
    });
  });

  it('should use system preference when localStorage is empty', async () => {
    // Mock system dark mode preference
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
      writable: true,
    });

    await act(async () => {
      render(<ThemeToggle />);
    });

    await waitFor(() => {
      expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: light)');
    });
  });

  it('should toggle theme when clicked', async () => {
    await act(async () => {
      render(<ThemeToggle />);
    });

    // Wait for component to mount
    await waitFor(() => {
      expect(classListMock.add).toHaveBeenCalled();
    });

    const button = screen.getByRole('button');
    
    await act(async () => {
      fireEvent.click(button);
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', expect.any(String));
  });

  it('should apply dark theme class when dark mode is selected', async () => {
    localStorageMock['theme'] = 'dark';

    await act(async () => {
      render(<ThemeToggle />);
    });

    await waitFor(() => {
      expect(classListMock.add).toHaveBeenCalledWith('dark');
    });
  });

  it('should remove dark theme class when light mode is selected', async () => {
    localStorageMock['theme'] = 'light';

    await act(async () => {
      render(<ThemeToggle />);
    });

    await waitFor(() => {
      expect(classListMock.remove).toHaveBeenCalledWith('dark');
    });
  });

  it('should set data-theme attribute on document', async () => {
    await act(async () => {
      render(<ThemeToggle />);
    });

    await waitFor(() => {
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', expect.any(String));
    });
  });

  it('should handle corrupted localStorage gracefully', async () => {
    // Simulate corrupted localStorage with invalid theme value
    localStorageMock['theme'] = 'invalid-theme';

    await act(async () => {
      render(<ThemeToggle />);
    });

    // Should still render without crashing
    expect(document.body).toBeInTheDocument();
  });

  it('should handle localStorage being unavailable gracefully', async () => {
    // Mock localStorage methods to throw errors
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => {
          throw new Error('localStorage not available');
        }),
        setItem: vi.fn(() => {
          throw new Error('localStorage not available');
        }),
        removeItem: vi.fn(),
      },
      writable: true,
    });

    // Should not throw because the component handles the error
    expect(() => {
      render(<ThemeToggle />);
    }).not.toThrow();
  });

  it('should show placeholder or button', async () => {
    const { container } = render(<ThemeToggle />);
    
    // Should have either a placeholder div or the actual button
    await waitFor(() => {
      const hasPlaceholder = container.querySelector('.w-8') !== null;
      const hasButton = container.querySelector('button') !== null;
      expect(hasPlaceholder || hasButton).toBe(true);
    });
  });

  it('should toggle from dark to light', async () => {
    localStorageMock['theme'] = 'dark';

    await act(async () => {
      render(<ThemeToggle />);
    });

    await waitFor(() => {
      expect(classListMock.add).toHaveBeenCalled();
    });

    const button = screen.getByRole('button');
    
    await act(async () => {
      fireEvent.click(button);
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(classListMock.remove).toHaveBeenCalledWith('dark');
  });

  it('should toggle from light to dark', async () => {
    localStorageMock['theme'] = 'light';

    await act(async () => {
      render(<ThemeToggle />);
    });

    await waitFor(() => {
      expect(classListMock.remove).toHaveBeenCalled();
    });

    const button = screen.getByRole('button');
    
    await act(async () => {
      fireEvent.click(button);
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(classListMock.add).toHaveBeenCalledWith('dark');
  });

  it('should have correct aria-label', async () => {
    await act(async () => {
      render(<ThemeToggle />);
    });

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Toggle Theme');
    });
  });

  it('should handle rapid toggles', async () => {
    await act(async () => {
      render(<ThemeToggle />);
    });

    await waitFor(() => {
      expect(classListMock.add).toHaveBeenCalled();
    });

    const button = screen.getByRole('button');
    
    // Click multiple times rapidly
    await act(async () => {
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
    });

    // Should have set localStorage multiple times
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(3);
  });
});

describe('ThemeToggle cache behavior', () => {
  it('should persist theme preference across renders', async () => {
    const localStorageMock: { [key: string]: string } = {};
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => localStorageMock[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          localStorageMock[key] = value;
        }),
      },
      writable: true,
    });

    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: { add: vi.fn(), remove: vi.fn() },
        setAttribute: vi.fn(),
      },
      writable: true,
    });

    const { unmount } = render(<ThemeToggle />);
    unmount();

    // Change theme in localStorage
    localStorageMock['theme'] = 'light';

    // Re-render
    render(<ThemeToggle />);

    expect(window.localStorage.getItem).toHaveBeenCalledWith('theme');
  });
});
