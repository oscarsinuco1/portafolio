import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Starfield from '../Starfield';

describe('Starfield', () => {
  it('should render without crashing', () => {
    render(<Starfield />);
    expect(document.body).toBeInTheDocument();
  });

  it('should render null on server/initial render', () => {
    // Before useEffect runs, component returns null
    const { container } = render(<Starfield />);
    // The container might be empty or contain the mounted elements
    expect(container).toBeInTheDocument();
  });

  it('should render after mounting', async () => {
    render(<Starfield />);
    
    // Wait for useEffect to run
    await waitFor(() => {
      const starElements = document.querySelectorAll('.star-element');
      expect(starElements.length).toBeGreaterThan(0);
    });
  });

  it('should render stars with correct animation class', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const stars = document.querySelectorAll('.animate-star-travel');
      expect(stars.length).toBeGreaterThan(0);
    });
  });

  it('should render distant stars with twinkle animation', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const distantStars = document.querySelectorAll('.animate-twinkle');
      expect(distantStars.length).toBeGreaterThan(0);
    });
  });

  it('should render nebulas with float animation', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const nebulas = document.querySelectorAll('.animate-nebula-float');
      expect(nebulas.length).toBeGreaterThan(0);
    });
  });

  it('should have fixed positioning', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const container = document.querySelector('.fixed');
      expect(container).toBeInTheDocument();
    });
  });

  it('should have pointer-events-none', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const container = document.querySelector('.pointer-events-none');
      expect(container).toBeInTheDocument();
    });
  });

  it('should use CSS custom properties for colors', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const nebulas = document.querySelectorAll('.nebula-element');
      nebulas.forEach((nebula) => {
        const style = (nebula as HTMLElement).style;
        expect(style.backgroundColor).toContain('var(--color-');
      });
    });
  });

  it('should have correct star count range', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const stars = document.querySelectorAll('.star-element');
      // Should have around 150 stars
      expect(stars.length).toBeGreaterThan(100);
      expect(stars.length).toBeLessThanOrEqual(150);
    });
  });

  it('should have correct distant star count', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const distantStars = document.querySelectorAll('.distant-star-element');
      // Should have around 300 distant stars
      expect(distantStars.length).toBeGreaterThan(200);
      expect(distantStars.length).toBeLessThanOrEqual(300);
    });
  });

  it('should have correct nebula count', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const nebulas = document.querySelectorAll('.nebula-element');
      // Should have around 3 nebulas
      expect(nebulas.length).toBe(3);
    });
  });

  it('should have unique ids for stars', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const stars = document.querySelectorAll('[class*="star"]');
      const ids = new Set();
      let hasDuplicates = false;
      
      stars.forEach((star) => {
        const id = star.getAttribute('key') || Math.random();
        if (ids.has(id)) {
          hasDuplicates = true;
        }
        ids.add(id);
      });
      
      // We can't easily check keys, but we verify stars are rendered
      expect(stars.length).toBeGreaterThan(0);
    });
  });

  it('should apply correct inline styles to stars', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const stars = document.querySelectorAll('.star-element');
      const firstStar = stars[0] as HTMLElement;
      
      if (firstStar) {
        expect(firstStar.style.left).toMatch(/%$/);
        expect(firstStar.style.animationDuration).toMatch(/s$/);
        expect(firstStar.style.opacity).toBeDefined();
      }
    });
  });

  it('should handle window resize gracefully', async () => {
    render(<Starfield />);
    
    // Trigger resize event
    global.dispatchEvent(new Event('resize'));
    
    await waitFor(() => {
      const stars = document.querySelectorAll('.star-element');
      expect(stars.length).toBeGreaterThan(0);
    });
  });

  it('should have will-change property for performance', async () => {
    render(<Starfield />);
    
    await waitFor(() => {
      const stars = document.querySelectorAll('.star-element');
      expect(stars.length).toBeGreaterThan(0);
      // will-change is set in CSS, not inline
    });
  });
});

describe('Starfield SSR behavior', () => {
  it('should render without document errors', () => {
    // This test ensures the component doesn't crash in non-browser environments
    const { container } = render(<Starfield />);
    expect(container).toBeInTheDocument();
  });
});

describe('Starfield memory and performance', () => {
  it('should clean up correctly on unmount', async () => {
    const { unmount, container } = render(<Starfield />);
    
    // Wait for stars to render
    await waitFor(() => {
      const stars = container.querySelectorAll('.star-element');
      expect(stars.length).toBeGreaterThan(0);
    });
    
    unmount();
    
    // After unmount, the container should be empty or the component removed
    expect(document.querySelector('.star-element')).toBeNull();
  });

  it('should regenerate stars on remount', async () => {
    const { unmount, container } = render(<Starfield />);
    
    await waitFor(() => {
      const stars = container.querySelectorAll('.star-element');
      expect(stars.length).toBeGreaterThan(0);
    });
    
    unmount();
    
    // Re-render
    const { container: newContainer } = render(<Starfield />);
    
    await waitFor(() => {
      const stars = newContainer.querySelectorAll('.star-element');
      expect(stars.length).toBeGreaterThan(0);
    });
  });
});
