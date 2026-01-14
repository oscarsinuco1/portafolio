import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const MobileMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-primary hover:bg-primary/10 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeMenu}
                    />

                    {/* Menu Panel */}
                    <div className="absolute top-16 right-4 left-4 bg-surface/95 backdrop-blur-md rounded-2xl border border-primary/20 shadow-2xl p-6">
                        <nav className="space-y-4">
                            <a
                                href="#experience"
                                onClick={closeMenu}
                                className="block py-3 px-4 text-lg font-medium text-base hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                            >
                                Experiencia
                            </a>
                            <a
                                href="#projects"
                                onClick={closeMenu}
                                className="block py-3 px-4 text-lg font-medium text-base hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                            >
                                Proyectos
                            </a>
                            <a
                                href="#skills"
                                onClick={closeMenu}
                                className="block py-3 px-4 text-lg font-medium text-base hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                            >
                                Habilidades
                            </a>
                            <a
                                href="#contact"
                                onClick={closeMenu}
                                className="block py-3 px-4 text-lg font-medium text-base bg-primary rounded-lg hover:bg-secondary transition-all text-center"
                            >
                                Contacto
                            </a>
                            <div className="pt-4 border-t border-white/10">
                                <ThemeToggle />
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileMenu;