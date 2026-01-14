import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { uiColors } from '../styles/colorTokens';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check initial theme
        const stored = localStorage.getItem('theme');
        const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        const current = stored || system;

        if (current === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        if (stored) {
            setTheme(stored as 'light' | 'dark');
            document.documentElement.setAttribute('data-theme', stored);
        } else {
            // Default based on system or fallback
            setTheme(current as 'light' | 'dark');
            document.documentElement.setAttribute('data-theme', current);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    if (!mounted) {
        return <div className="w-8 h-8" />; // Placeholder to prevent layout shift
    }

    return (
        <button
            onClick={toggleTheme}
            className={`
        p-2 rounded-full transition-all duration-300 border
        ${theme === 'dark'
                    ? `${uiColors.toggle.dark.bg} ${uiColors.toggle.dark.text} ${uiColors.toggle.dark.border} ${uiColors.toggle.dark.hoverBg} ${uiColors.toggle.dark.hoverShadow}`
                    : `${uiColors.toggle.light.bg} ${uiColors.toggle.light.text} ${uiColors.toggle.light.border} ${uiColors.toggle.light.hoverBg} ${uiColors.toggle.light.hoverShadow}`}
      `}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
        </button>
    );
};

export default ThemeToggle;
