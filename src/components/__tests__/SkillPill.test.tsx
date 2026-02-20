import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillPill from '../SkillPill';
import { FaReact } from 'react-icons/fa';

describe('SkillPill', () => {
  it('should render with valid name and icon', () => {
    render(<SkillPill name="React" icon={FaReact} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('should render the icon component', () => {
    const { container } = render(<SkillPill name="React" icon={FaReact} />);
    
    // Check that an SVG is rendered (react-icons render SVGs)
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should return null when icon is null', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const { container } = render(<SkillPill name="Null Skill" icon={null as unknown as React.ElementType} />);
    
    expect(container.firstChild).toBeNull();
    expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('SkillPill: Icon for "Null Skill" is null or undefined.'));
    
    consoleError.mockRestore();
  });

  it('should return null when icon is undefined', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const { container } = render(<SkillPill name="Undefined Skill" icon={undefined as unknown as React.ElementType} />);
    
    expect(container.firstChild).toBeNull();
    expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('SkillPill: Icon for "Undefined Skill" is null or undefined.'));
    
    consoleError.mockRestore();
  });

  it('should handle empty string name', () => {
    render(<SkillPill name="" icon={FaReact} />);
    
    // Should still render with empty name
    expect(document.querySelector('.rounded-full')).toBeInTheDocument();
  });

  it('should handle very long name', () => {
    const longName = 'A'.repeat(100);
    render(<SkillPill name={longName} icon={FaReact} />);
    
    expect(screen.getByText(longName)).toBeInTheDocument();
  });

  it('should handle special characters in name', () => {
    const specialName = 'C++ / C# <>&"\'';
    render(<SkillPill name={specialName} icon={FaReact} />);
    
    expect(screen.getByText(specialName)).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(<SkillPill name="Test" icon={FaReact} />);
    
    const pill = container.firstChild as HTMLElement;
    expect(pill).toHaveClass('rounded-full');
    expect(pill).toHaveClass('flex');
    expect(pill).toHaveClass('items-center');
  });

  it('should render custom icon component', () => {
    const CustomIcon = () => <span data-testid="custom-icon">★</span>;
    
    render(<SkillPill name="Custom" icon={CustomIcon} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('should handle icon that is not a valid component', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Pass a string instead of a component
    const { container } = render(
      <SkillPill name="Invalid Icon" icon={"not-a-component" as unknown as React.ElementType} />
    );
    
    // Should handle gracefully (might render nothing or throw, we just check it doesn't crash)
    expect(() => render(<SkillPill name="Invalid Icon" icon={"not-a-component" as unknown as React.ElementType} />)).not.toThrow();
    
    consoleError.mockRestore();
  });

  it('should handle whitespace-only name', () => {
    render(<SkillPill name="   " icon={FaReact} />);
    
    // Should render with whitespace
    expect(document.querySelector('.rounded-full')).toBeInTheDocument();
  });

  it('should handle name with emojis', () => {
    render(<SkillPill name="React 🚀" icon={FaReact} />);
    
    expect(screen.getByText('React 🚀')).toBeInTheDocument();
  });

  it('should handle icon as a function', () => {
    const FunctionalIcon = ({ className }: { className?: string }) => (
      <div className={className} data-testid="func-icon">Icon</div>
    );
    
    render(<SkillPill name="Functional" icon={FunctionalIcon} />);
    
    expect(screen.getByTestId('func-icon')).toBeInTheDocument();
  });
});

describe('SkillPill edge cases with SkillsList', () => {
  it('should handle rendering multiple pills', () => {
    const skills = [
      { name: 'React', icon: FaReact },
      { name: 'Vue', icon: FaReact },
      { name: 'Angular', icon: FaReact },
    ];

    const { container } = render(
      <>
        {skills.map((skill) => (
          <SkillPill key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </>
    );

    const pills = container.querySelectorAll('.rounded-full');
    expect(pills.length).toBe(3);
  });

  it('should handle mixed valid and invalid icons in list', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const skills = [
      { name: 'Valid', icon: FaReact },
      { name: 'Invalid', icon: null as unknown as React.ElementType },
      { name: 'Another Valid', icon: FaReact },
    ];

    const { container } = render(
      <>
        {skills.map((skill) => (
          <SkillPill key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </>
    );

    // Should have 2 rendered pills (one is null)
    const pills = container.querySelectorAll('.rounded-full');
    expect(pills.length).toBe(2);
    
    consoleError.mockRestore();
  });
});
