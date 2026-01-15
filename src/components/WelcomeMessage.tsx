import React, { useState, useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeMessage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        const timer = setTimeout(() => {
            setIsVisible(false);
            window.dispatchEvent(new Event('launch-complete'));
        }, 3500);       

        return () => {
            document.body.classList.remove('overflow-hidden');
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    className="welcome-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8 } }}
                >
                    <div className="welcome-content">
                        <motion.div 
                            className="rocket-icon"
                            animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        >
                            <FaRocket />
                        </motion.div>

                        <div className="text-container">
                            <motion.h1 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="title"
                            >
                                ¡Qué alegría tenerte aquí!
                            </motion.h1>
                            
                            <div className="progress-track">
                                <motion.div 
                                    className="progress-bar"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "easeInOut" }}
                                />
                            </div>
                            
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="subtext-group"
                            >
                                <p className="subtitle">Ponte cómodo, vamos a empezar.</p>
                                <p className="label">Bienvenido a mi espacio digital</p>
                            </motion.div>
                        </div>
                    </div>

                    <style>{`
                        .welcome-overlay {
                            position: fixed;
                            inset: 0;
                            z-index: 9999;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            pointer-events: none;
                        }

                        .welcome-content {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 2rem;
                            text-align: center;
                            padding: 0 1.5rem;
                        }

                        /* --- COLORES POR DEFECTO (DARK / OSCURO) --- */
                        .rocket-icon { 
                            font-size: 4.5rem;
                            filter: drop-shadow(0 0 15px rgba(255,255,255,0.3));
                        }
                        .title { 
                            font-size: 2.5rem; 
                            font-weight: 700; 
                            color: white; 
                            letter-spacing: -0.02em;
                            margin: 0;
                        }
                        .progress-track { 
                            width: 10rem; 
                            height: 2px; 
                            background: rgba(255,255,255,0.1); 
                            margin: 0 auto; 
                            border-radius: 99px; 
                            overflow: hidden; 
                        }
                        .progress-bar { height: 100%; background: white; }
                        .subtitle { font-size: 1.125rem; color: rgba(255,255,255,0.9); font-weight: 500; margin: 0; }
                        .label { font-size: 0.7rem; color: rgba(255,255,255,0.4); font-family: monospace; text-transform: uppercase; letter-spacing: 0.3em; margin-top: 0.5rem; }

                        @media (min-width: 768px) {
                            .title { font-size: 3.5rem; }
                            .progress-track { width: 14rem; }
                            .subtitle { font-size: 1.25rem; }
                        }

                        /* --- MODO CLARO (Basado en tu data-theme="light") --- */
                        :special-selector-root[data-theme="light"] .rocket-icon,
                        [data-theme="light"] .rocket-icon { 
                            fill-color: #1e293b; 
                            filter: drop-shadow(0 0 10px rgba(0,0,0,0.1));
                        }
                        [data-theme="light"] .title { color: #0f172a; }
                        [data-theme="light"] .progress-track { background: rgba(0,0,0,0.05); }
                        [data-theme="light"] .progress-bar { background: #1e293b; }
                        [data-theme="light"] .subtitle { color: #334155; }
                        [data-theme="light"] .label { color: #94a3b8; }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeMessage;