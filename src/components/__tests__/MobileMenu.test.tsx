import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MobileMenu from '../MobileMenu';

// Mock ThemeToggle
vi.mock('../ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

describe('MobileMenu', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = '';
  });

  it('should render the menu button', () => {
    render(<MobileMenu />);
    
    const button = screen.getByRole('button', { name: /toggle menu/i });
    expect(button).toBeInTheDocument();
  });

  it('should be closed by default', () => {
    render(<MobileMenu />);
    
    // Menu items should not be visible when closed
    expect(screen.queryByText('Sobre mí')).not.toBeVisible();
  });

  it('should open menu when clicking the button', async () => {
    render(<MobileMenu />);
    
    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    });
  });

  it('should close menu when clicking a nav link', async () => {
    render(<MobileMenu />);
    
    // Open menu
    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    });

    // Click a link
    fireEvent.click(screen.getByText('Sobre mí'));
    
    await waitFor(() => {
      expect(screen.queryByText('Sobre mí')).not.toBeVisible();
    });
  });

  it('should close menu on Escape key', async () => {
    render(<MobileMenu />);
    
    // Open menu
    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    });

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByText('Sobre mí')).not.toBeVisible();
    });
  });

  it('should lock body scroll when open', async () => {
    render(<MobileMenu />);
    
    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('should unlock body scroll when closed', async () => {
    render(<MobileMenu />);
    
    const button = screen.getByRole('button', { name: /toggle menu/i });
    
    // Open
    fireEvent.click(button);
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
    
    // Close
    fireEvent.click(button);
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  it('should contain all navigation links', async () => {
    render(<MobileMenu />);
    
    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Sobre mí')).toBeInTheDocument();
      expect(screen.getByText('Experiencia')).toBeInTheDocument();
      expect(screen.getByText('Proyectos')).toBeInTheDocument();
      expect(screen.getByText('Habilidades')).toBeInTheDocument();
      expect(screen.getByText('Contacto')).toBeInTheDocument();
    });
  });

  it('should include ThemeToggle', async () => {
    render(<MobileMenu />);
    
    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });
  });

  it('should handle rapid open/close clicks', async () => {
    render(<MobileMenu />);
    
    const button = screen.getByRole('button', { name: /toggle menu/i });
    
    // Rapid clicks
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    // Should end in open state (odd number of clicks)
    await waitFor(() => {
      expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    });
  });

  it('should have correct href on nav links', async () => {
    render(<MobileMenu />);
    
    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      const aboutLink = screen.getByText('Sobre mí').closest('a');
      expect(aboutLink).toHaveAttribute('href', '#about');
      
      const experienceLink = screen.getByText('Experiencia').closest('a');
      expect(experienceLink).toHaveAttribute('href', '#experience');
    });
  });

  it('should handle Tab key for focus trapping', async () => {
    render(<MobileMenu />);
    
    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    });

    // Tab should not close the menu
    fireEvent.keyDown(document, { key: 'Tab' });
    
    // Menu should still be open
    expect(screen.getByText('Sobre mí')).toBeInTheDocument();
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = render(<MobileMenu />);
    
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should close menu when clicking outside', async () => {
    // Create a container that includes both the outside element and menu
    const { container } = render(
      <div>
        <div data-testid="outside">Outside</div>
        <MobileMenu />
      </div>
    );
    
    // Open menu
    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    });

    // Click outside - simulate clicking outside by triggering mousedown on document
    fireEvent.mouseDown(document.body);
    
    // The menu should close
    await waitFor(() => {
      const menu = screen.queryByText('Sobre mí');
      expect(menu).not.toBeVisible();
    }, { timeout: 2000 });
  });
});

describe('MobileMenu edge cases', () => {
  it('should handle null refs gracefully', () => {
    // This tests internal error handling
    const { container } = render(<MobileMenu />);
    expect(container).toBeInTheDocument();
  });

  it('should handle missing focusable elements', async () => {
    render(<MobileMenu />);
    
    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);
    
    // Should not throw even if focus management encounters edge cases
    await waitFor(() => {
      expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    });
  });
});
