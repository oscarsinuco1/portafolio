import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const MobileMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Cierra al hacer clic fuera del área del menú
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Manejar escape y focus trapping
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOpen) return;

            if (event.key === 'Escape') {
                closeMenu();
                toggleRef.current?.focus();
            } else if (event.key === 'Tab') {
                const menu = menuRef.current;
                if (!menu) return;

                const focusableElements = menu.querySelectorAll('a, button');
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Focus first link when menu opens
            setTimeout(() => firstLinkRef.current?.focus(), 100);
        }

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Opcional: Bloquear scroll solo si quieres, si no, puedes comentar este useEffect
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <div className="mobile-nav-container" ref={menuRef}>
            {/* Botón flotante */}
            <button
                onClick={toggleMenu}
                className={`menu-trigger ${isOpen ? 'active' : ''}`}
                aria-label="Toggle menu"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Menú Flotante */}
            <div className={`floating-menu-overlay ${isOpen ? 'is-visible' : ''}`}>
                {/* Backdrop ahora es transparente y sin blur */}
                <div className="menu-backdrop-clear" onClick={closeMenu} />
                
                <div className="menu-card">
                    <nav className="nav-links">
                        <a href="#about" onClick={closeMenu} className="nav-item">Sobre mí</a>
                        <a href="#experience" onClick={closeMenu} className="nav-item">Experiencia</a>
                        <a href="#projects" onClick={closeMenu} className="nav-item">Proyectos</a>
                        <a href="#skills" onClick={closeMenu} className="nav-item">Habilidades</a>
                        <a href="#contact" onClick={closeMenu} className="nav-item contact-btn">Contacto</a>
                        
                        <div className="menu-divider" />
                        
                        <div className="theme-wrapper">
                            <ThemeToggle />
                        </div>
                    </nav>
                </div>
            </div>

            <style>{`
                .mobile-nav-container { display: block; }
                @media (min-width: 768px) { .mobile-nav-container { display: none; } }

                .menu-trigger {
                    position: fixed;
                    top: 1rem;
                    right: 1rem;
                    z-index: 100;
                    background: rgba(var(--color-bg-surface), 0.95);
                    border: 1px solid rgba(var(--color-primary), 0.2);
                    color: rgb(var(--color-primary));
                    width: 42px;
                    height: 42px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .menu-trigger.active {
                    color: rgb(var(--color-secondary));
                    border-color: rgba(var(--color-secondary), 0.3);
                }

                .floating-menu-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 90;
                    visibility: hidden;
                    pointer-events: none;
                }

                .floating-menu-overlay.is-visible {
                    visibility: visible;
                    pointer-events: all;
                }

                /* Fondo transparente para detectar clics fuera, sin blur */
                .menu-backdrop-clear {
                    position: absolute;
                    inset: 0;
                    background: transparent;
                }

                .menu-card {
                    position: absolute;
                    top: 4.5rem;
                    right: 1rem;
                    width: 200px;
                    background: rgb(var(--color-bg-surface));
                    border: 1px solid rgba(var(--color-primary), 0.2);
                    border-radius: 14px;
                    padding: 0.75rem;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                    transform: translateY(-10px) scale(0.95);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    transform-origin: top right;
                }

                .floating-menu-overlay.is-visible .menu-card {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }

                .nav-links { display: flex; flex-direction: column; gap: 2px; }

                .nav-item {
                    display: block;
                    padding: 0.6rem 1rem;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: rgb(var(--color-text-base));
                    text-decoration: none;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                }

                .nav-item:hover {
                    background: rgba(var(--color-primary), 0.1);
                    color: rgb(var(--color-primary));
                }

                .contact-btn {
                    background: rgb(var(--color-primary));
                    color: rgb(var(--color-text-inverted)) !important;
                    margin-top: 4px;
                    text-align: center;
                    font-weight: 700;
                }

                .menu-divider {
                    height: 1px;
                    background: rgba(var(--color-text-muted), 0.15);
                    margin: 0.5rem 0;
                }

                .theme-wrapper { display: flex; justify-content: center; }

                /* Modo Claro */
                [data-theme="light"] .menu-card {
                    background: #ffffff;
                    border-color: #e2e8f0;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }
                
                [data-theme="light"] .menu-trigger {
                    background: #ffffff;
                    border-color: #e2e8f0;
                }
            `}</style>
        </div>
    );
};

export default MobileMenu;