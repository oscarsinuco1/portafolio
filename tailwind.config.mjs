export default {
  darkMode: 'class',
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        base: 'rgb(var(--color-bg-base) / <alpha-value>)',
        surface: 'rgb(var(--color-bg-surface) / <alpha-value>)',
        highlight: 'rgb(var(--color-bg-highlight) / <alpha-value>)',
        'text-base': 'rgb(var(--color-text-base) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        'text-inverted': 'rgb(var(--color-text-inverted) / <alpha-value>)',
        
        // Timeline theme colors
        'timeline-emerald': {
          primary: 'rgb(var(--color-timeline-emerald-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-timeline-emerald-secondary) / <alpha-value>)',
          bg: 'rgb(var(--color-timeline-emerald-bg) / <alpha-value>)',
        },
        'timeline-blue': {
          primary: 'rgb(var(--color-timeline-blue-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-timeline-blue-secondary) / <alpha-value>)',
          bg: 'rgb(var(--color-timeline-blue-bg) / <alpha-value>)',
        },
        'timeline-purple': {
          primary: 'rgb(var(--color-timeline-purple-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-timeline-purple-secondary) / <alpha-value>)',
          bg: 'rgb(var(--color-timeline-purple-bg) / <alpha-value>)',
        },
        
        // Toggle colors
        'toggle-dark': {
          bg: 'rgb(var(--color-toggle-dark-bg) / <alpha-value>)',
          text: 'rgb(var(--color-toggle-dark-text) / <alpha-value>)',
          border: 'rgb(var(--color-toggle-dark-border) / <alpha-value>)',
        },
        'toggle-light': {
          bg: 'rgb(var(--color-toggle-light-bg) / <alpha-value>)',
          text: 'rgb(var(--color-toggle-light-text) / <alpha-value>)',
          border: 'rgb(var(--color-toggle-light-border) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};
