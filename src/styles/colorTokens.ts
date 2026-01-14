// Color tokens for use in JavaScript/TypeScript components

/**
 * Timeline theme colors for use in the ExperienceTimeline component
 */
export const timelineThemes = {
  emerald: {
    id: 'emerald',
    primary: 'rgb(var(--color-timeline-emerald-primary))',
    secondary: 'rgb(var(--color-timeline-emerald-secondary))',
    bgTint: 'rgba(var(--color-timeline-emerald-bg), 0.4)',
    gradient: 'from-emerald-400 to-cyan-400',
    iconBg: 'rgb(var(--color-timeline-emerald-bg))',
    shadow: 'rgba(var(--color-timeline-emerald-primary), 0.25)'
  },
  blue: {
    id: 'blue',
    primary: 'rgb(var(--color-timeline-blue-primary))',
    secondary: 'rgb(var(--color-timeline-blue-secondary))',
    bgTint: 'rgba(var(--color-timeline-blue-bg), 0.4)',
    gradient: 'from-blue-400 to-indigo-400',
    iconBg: 'rgb(var(--color-timeline-blue-bg))',
    shadow: 'rgba(var(--color-timeline-blue-primary), 0.25)'
  },
  purple: {
    id: 'purple',
    primary: 'rgb(var(--color-timeline-purple-primary))',
    secondary: 'rgb(var(--color-timeline-purple-secondary))',
    bgTint: 'rgba(var(--color-timeline-purple-bg), 0.4)',
    gradient: 'from-pink-400 to-rose-400',
    iconBg: 'rgb(var(--color-timeline-purple-bg))',
    shadow: 'rgba(var(--color-timeline-purple-primary), 0.25)'
  }
};

/**
 * Effect colors for special visual effects
 */
export const effectColors = {
  rainbow: {
    color1: 'rgb(var(--color-rainbow-1))',
    color2: 'rgb(var(--color-rainbow-2))',
    color3: 'rgb(var(--color-rainbow-3))',
    color4: 'rgb(var(--color-rainbow-1))' // Repeat first color for gradient
  },
  scanlines: {
    dark: 'rgba(var(--color-scanline-dark), 0)',
    light: 'rgba(var(--color-scanline-light), 0.25)'
  },
  bgOverlay: {
    dark: 'rgba(var(--color-bg-overlay-dark), 0.95)',
    light: 'rgba(var(--color-bg-overlay-light), 0.98)'
  }
};

/**
 * UI element colors for components
 */
export const uiColors = {
  timeline: {
    line: 'rgba(var(--color-timeline-line), 0.1)'
  },
  toggle: {
    dark: {
      bg: 'bg-white/10',
      text: 'text-yellow-400',
      border: 'border-yellow-400/30',
      hoverBg: 'hover:bg-white/20',
      hoverShadow: 'hover:shadow-[0_0_15px_rgba(var(--color-toggle-dark-border),0.4)]'
    },
    light: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      hoverBg: 'hover:bg-indigo-200',
      hoverShadow: 'hover:shadow-[0_0_15px_rgba(var(--color-toggle-light-text),0.3)]'
    }
  }
};

/**
 * Shadow utility classes
 */
export const shadowClasses = {
  primary: {
    sm: 'shadow-primary-sm',
    md: 'shadow-primary-md',
    lg: 'shadow-primary-lg'
  },
  secondary: {
    sm: 'shadow-secondary-sm',
    md: 'shadow-secondary-md',
    lg: 'shadow-secondary-lg'
  }
};