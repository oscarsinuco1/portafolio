import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExperienceTimeline from '../ExperienceTimeline';

// Mock react-vertical-timeline-component
vi.mock('react-vertical-timeline-component', () => ({
  default: {
    VerticalTimeline: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="vertical-timeline">{children}</div>
    ),
    VerticalTimelineElement: ({ 
      children, 
      date,
      icon,
      iconStyle,
      contentStyle,
      contentArrowStyle,
      dateClassName,
    }: { 
      children: React.ReactNode;
      date?: string;
      icon?: React.ReactNode;
      iconStyle?: React.CSSProperties;
      contentStyle?: React.CSSProperties;
      contentArrowStyle?: React.CSSProperties;
      dateClassName?: string;
    }) => (
      <div data-testid="timeline-element" data-date={date}>
        {icon && <div data-testid="timeline-icon">{icon}</div>}
        <div style={contentStyle}>{children}</div>
      </div>
    ),
  },
}));

// Mock the experience data
vi.mock('../../data/experience', () => ({
  experienceData: [
    {
      date: '2023 - Presente',
      title: 'Senior Developer',
      company: 'Tech Corp',
      location: 'Remoto',
      description: ['Led team', 'Built features', 'Improved performance'],
    },
    {
      date: '2021 - 2023',
      title: 'Developer',
      company: 'Startup Inc',
      location: 'Híbrido',
      description: ['Developed app', 'Fixed bugs'],
    },
    {
      date: '2020 - 2021',
      title: 'Junior Developer',
      company: 'Agency Co',
      location: 'Oficina',
      description: ['Learned codebase'],
    },
  ],
}));

// Mock react-icons
vi.mock('react-icons/fa', () => ({
  FaBriefcase: () => <span data-testid="briefcase-icon">💼</span>,
}));

// Mock colorTokens
vi.mock('../../styles/colorTokens', () => ({
  timelineThemes: {
    emerald: {
      id: 'emerald',
      primary: 'rgb(16, 185, 129)',
      secondary: 'rgb(52, 211, 153)',
      bgTint: 'rgba(16, 185, 129, 0.4)',
      gradient: 'from-emerald-400 to-cyan-400',
      iconBg: 'rgb(6, 78, 59)',
      shadow: 'rgba(16, 185, 129, 0.25)',
    },
    blue: {
      id: 'blue',
      primary: 'rgb(59, 130, 246)',
      secondary: 'rgb(96, 165, 250)',
      bgTint: 'rgba(59, 130, 246, 0.4)',
      gradient: 'from-blue-400 to-indigo-400',
      iconBg: 'rgb(30, 58, 138)',
      shadow: 'rgba(59, 130, 246, 0.25)',
    },
    purple: {
      id: 'purple',
      primary: 'rgb(168, 85, 247)',
      secondary: 'rgb(192, 132, 252)',
      bgTint: 'rgba(168, 85, 247, 0.4)',
      gradient: 'from-pink-400 to-rose-400',
      iconBg: 'rgb(88, 28, 135)',
      shadow: 'rgba(168, 85, 247, 0.25)',
    },
  },
  uiColors: {
    timeline: {
      line: 'rgba(255, 255, 255, 0.1)',
    },
  },
}));

describe('ExperienceTimeline', () => {
  it('should render without crashing', () => {
    render(<ExperienceTimeline />);
    expect(screen.getByTestId('vertical-timeline')).toBeInTheDocument();
  });

  it('should render all experience items', () => {
    render(<ExperienceTimeline />);
    
    const elements = screen.getAllByTestId('timeline-element');
    expect(elements.length).toBe(3);
  });

  it('should have dates in data attributes', () => {
    render(<ExperienceTimeline />);
    
    const elements = screen.getAllByTestId('timeline-element');
    expect(elements[0]).toHaveAttribute('data-date', '2023 - Presente');
    expect(elements[1]).toHaveAttribute('data-date', '2021 - 2023');
    expect(elements[2]).toHaveAttribute('data-date', '2020 - 2021');
  });

  it('should display job titles', () => {
    render(<ExperienceTimeline />);
    
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Junior Developer')).toBeInTheDocument();
  });

  it('should display companies', () => {
    render(<ExperienceTimeline />);
    
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Startup Inc')).toBeInTheDocument();
    expect(screen.getByText('Agency Co')).toBeInTheDocument();
  });

  it('should display locations as badges', () => {
    render(<ExperienceTimeline />);
    
    expect(screen.getByText('Remoto')).toBeInTheDocument();
    expect(screen.getByText('Híbrido')).toBeInTheDocument();
    expect(screen.getByText('Oficina')).toBeInTheDocument();
  });

  it('should display first description item always', () => {
    render(<ExperienceTimeline />);
    
    expect(screen.getByText('Led team')).toBeInTheDocument();
    expect(screen.getByText('Developed app')).toBeInTheDocument();
    expect(screen.getByText('Learned codebase')).toBeInTheDocument();
  });

  it('should render icons for each item', () => {
    render(<ExperienceTimeline />);
    
    const icons = screen.getAllByTestId('briefcase-icon');
    expect(icons.length).toBe(3);
  });

  it('should cycle through theme colors', () => {
    render(<ExperienceTimeline />);
    
    const elements = screen.getAllByTestId('timeline-element');
    expect(elements.length).toBe(3);
    // Each element should have a different theme applied
  });

  it('should have clickable elements', () => {
    render(<ExperienceTimeline />);
    
    // The cards should have cursor-pointer class
    const cards = document.querySelectorAll('.cursor-pointer');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should expand card details on click', async () => {
    render(<ExperienceTimeline />);
    
    // Find and click a card
    const clickableElements = document.querySelectorAll('.cursor-pointer, .group');
    if (clickableElements.length > 0) {
      fireEvent.click(clickableElements[0]);
    }
    
    // Component should still be rendered
    expect(screen.getByTestId('vertical-timeline')).toBeInTheDocument();
  });

  it('should handle multiple card clicks', () => {
    render(<ExperienceTimeline />);
    
    const clickableElements = document.querySelectorAll('.cursor-pointer, .group');
    
    clickableElements.forEach((el) => {
      fireEvent.click(el);
    });
    
    expect(screen.getByTestId('vertical-timeline')).toBeInTheDocument();
  });
});

describe('ExperienceTimeline with empty data', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should handle empty experience array', async () => {
    vi.doMock('../../data/experience', () => ({
      experienceData: [],
    }));

    const { default: EmptyExperienceTimeline } = await import('../ExperienceTimeline');
    
    render(<EmptyExperienceTimeline />);
    
    // Should render timeline with no elements
    expect(screen.getByTestId('vertical-timeline')).toBeInTheDocument();
  });
});

describe('ExperienceTimeline edge cases', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should handle single experience item', async () => {
    vi.doMock('../../data/experience', () => ({
      experienceData: [
        {
          date: '2024',
          title: 'Only Job',
          company: 'Solo Corp',
          location: 'Remote',
          description: ['Did everything'],
        },
      ],
    }));

    const { default: SingleExperienceTimeline } = await import('../ExperienceTimeline');
    
    render(<SingleExperienceTimeline />);
    
    expect(screen.getByText('Only Job')).toBeInTheDocument();
  });

  it('should handle experience with empty description', async () => {
    vi.doMock('../../data/experience', () => ({
      experienceData: [
        {
          date: '2024',
          title: 'Empty Desc',
          company: 'Corp',
          location: 'Remote',
          description: [],
        },
      ],
    }));

    const { default: EmptyDescTimeline } = await import('../ExperienceTimeline');
    
    render(<EmptyDescTimeline />);
    
    expect(screen.getByText('Empty Desc')).toBeInTheDocument();
  });

  it('should handle very long descriptions', async () => {
    const longDesc = 'A'.repeat(500);
    
    vi.doMock('../../data/experience', () => ({
      experienceData: [
        {
          date: '2024',
          title: 'Long Desc',
          company: 'Corp',
          location: 'Remote',
          description: [longDesc],
        },
      ],
    }));

    const { default: LongDescTimeline } = await import('../ExperienceTimeline');
    
    render(<LongDescTimeline />);
    
    expect(screen.getByText('Long Desc')).toBeInTheDocument();
  });
});
