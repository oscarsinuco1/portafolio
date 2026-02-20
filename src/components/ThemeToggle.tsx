import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { uiColors } from '../styles/colorTokens';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
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
        } catch (e) {
            // localStorage not available, use system preference or default to dark
            const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            setTheme(system);
            document.documentElement.setAttribute('data-theme', system);
            if (system === 'dark') {
                document.documentElement.classList.add('dark');
            }
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // localStorage not available, ignore
        }
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
