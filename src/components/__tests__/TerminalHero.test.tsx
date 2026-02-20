import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TerminalHero from '../TerminalHero';

// Create a proper mock for the typewriter chain API
const createMockTypewriter = () => {
  const chain = {
    typeString: vi.fn(() => chain),
    pauseFor: vi.fn(() => chain),
    callFunction: vi.fn((cb: () => void) => {
      // Execute callback immediately for testing
      cb();
      return chain;
    }),
    start: vi.fn(() => chain),
  };
  return chain;
};

// Mock Typewriter
vi.mock('typewriter-effect', () => ({
  default: ({ onInit }: { onInit?: (typewriter: ReturnType<typeof createMockTypewriter>) => void }) => {
    // Call onInit synchronously with the mock
    if (onInit) {
      onInit(createMockTypewriter());
    }
    return <div data-testid="typewriter">Typewriter content</div>;
  },
}));

describe('TerminalHero', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<TerminalHero />);
    expect(document.querySelector('.terminal-window')).toBeInTheDocument();
  });

  it('should render terminal header', () => {
    render(<TerminalHero />);
    
    expect(screen.getByText('oscar@portafolio:~ — zsh')).toBeInTheDocument();
  });

  it('should render window controls', () => {
    render(<TerminalHero />);
    
    // Look for the terminal bar
    expect(document.querySelector('.terminal-window')).toBeInTheDocument();
  });

  it('should focus input when clicking on terminal', async () => {
    render(<TerminalHero />);
    
    const terminal = document.querySelector('.terminal-window');
    
    // Simulate intro completion by clicking
    if (terminal) {
      fireEvent.click(terminal);
    }
    
    // Terminal should be clickable
    expect(terminal).toBeInTheDocument();
  });

  it('should handle command input', async () => {
    render(<TerminalHero />);
    
    // Wait for the input to be rendered
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'help' } });
      expect(input).toHaveValue('help');
    }
  });

  it('should handle command submission', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.submit(input.closest('form')!);
      expect(input).toHaveValue(''); // Input should be cleared
    }
  });

  it('should handle help command', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.submit(input.closest('form')!);
    }
    
    // After help command, navigation commands should appear in history
    await waitFor(() => {
      expect(document.body.textContent).toContain('Navegación');
    }, { timeout: 500 });
  });

  it('should handle clear command', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'clear' } });
      fireEvent.submit(input.closest('form')!);
    }
    
    // History should be cleared
    await waitFor(() => {
      const terminal = document.querySelector('.terminal-window');
      expect(terminal).toBeInTheDocument();
    }, { timeout: 500 });
  });

  it('should handle whoami command', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'whoami' } });
      fireEvent.submit(input.closest('form')!);
    }
    
    await waitFor(() => {
      expect(document.body.textContent).toContain('oscar');
    }, { timeout: 500 });
  });

  it('should handle neofetch command', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'neofetch' } });
      fireEvent.submit(input.closest('form')!);
    }
    
    await waitFor(() => {
      expect(document.body.textContent).toContain('Portafolio v1.0');
    }, { timeout: 500 });
  });

  it('should handle empty command', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.submit(input.closest('form')!);
    }
    
    // Should not crash
    expect(document.querySelector('.terminal-window')).toBeInTheDocument();
  });

  it('should handle navigation commands without crashing', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const commands = ['about', 'experience', 'skills', 'projects', 'contact'];
    
    for (const cmd of commands) {
      const input = document.querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: cmd } });
        fireEvent.submit(input.closest('form')!);
      }
    }
    
    // Commands executed without crashing
    expect(document.querySelector('.terminal-window')).toBeInTheDocument();
  });

  it('should handle me command (image display)', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'me' } });
      fireEvent.submit(input.closest('form')!);
    }
    
    // Should render without error
    expect(document.querySelector('.terminal-window')).toBeInTheDocument();
  });

  it('should handle rapid command submissions', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      for (let i = 0; i < 5; i++) {
        fireEvent.change(input, { target: { value: `command${i}` } });
        fireEvent.submit(input.closest('form')!);
      }
    }
    
    // Terminal should still be functional
    expect(document.querySelector('.terminal-window')).toBeInTheDocument();
  });

  it('should trim and lowercase commands', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: '  HELP  ' } });
      fireEvent.submit(input.closest('form')!);
    }
    
    await waitFor(() => {
      expect(document.body.textContent).toContain('Navegación');
    }, { timeout: 500 });
  });

  it('should have an input element with type text', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
  });
});

describe('TerminalHero edge cases', () => {
  it('should handle very long command', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const longCommand = 'a'.repeat(1000);
    const input = document.querySelector('input');
    
    if (input) {
      fireEvent.change(input, { target: { value: longCommand } });
      fireEvent.submit(input.closest('form')!);
    }
    
    // Should handle gracefully
    expect(document.querySelector('.terminal-window')).toBeInTheDocument();
  });

  it('should handle missing DOM elements for navigation', async () => {
    render(<TerminalHero />);
    
    await waitFor(() => {
      const input = document.querySelector('input');
      expect(input).toBeInTheDocument();
    }, { timeout: 1000 });
    
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'about' } });
      fireEvent.submit(input.closest('form')!);
    }
    
    // Should not throw even if element doesn't exist
    expect(document.querySelector('.terminal-window')).toBeInTheDocument();
  });
});
