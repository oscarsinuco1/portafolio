import React, { useState } from 'react';
import { projects } from '../data/projects';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

const ProjectShowcase: React.FC = () => {
    const [activeProject, setActiveProject] = useState(projects[0]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
            {/* Left Panel: Command Menu */}
            <div className="w-full lg:w-5/12 flex flex-col gap-4">
                <div className="neon-box p-6 rounded-2xl h-full border-l-4 border-l-primary/50 relative overflow-hidden">
                    {/* Decorative Scanline */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 animate-pulse"></div>

                    <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
                        <FaCode /> Proyectos
                    </h3>

                    <div className="flex flex-col gap-2">
                        {projects.map((project) => (
                            <button
                                key={project.id}
                                onClick={() => setActiveProject(project)}
                                className={`
                                    text-left px-4 py-3 rounded-lg font-mono text-sm transition-all hover:cursor-pointer duration-300 relative overflow-hidden group border
                                    ${activeProject.id !== project.id
                                        ? 'bg-transparent text-muted border-transparent hover:bg-primary/10 hover:border-primary/20 hover:text-primary'
                                        : ''}
                                `}
                            >
                                <span className={`absolute left-0 top-0 h-full w-1 transition-all duration-300 ${activeProject.id === project.id ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/50'}`}></span>
                                <span className="relative z-10 font-bold tracking-wider">
                                    {`> ${project.title.toUpperCase()}`}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel: Holographic Preview */}
            <div className="w-full lg:w-2/3" key={activeProject.id}>
                <div className="neon-box h-full rounded-2xl p-1 relative overflow-hidden group animate-slide-up">
                    {/* Glass Overlay/Reflection */}
                    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 left-[-100%] group-hover:animate-shine" />

                    <div className="bg-surface/90 h-full w-full rounded-xl p-8 flex flex-col relative z-10 transition-all duration-500">
                        {/* Header */}
                        <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-6">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_10px_rgba(var(--color-primary),0.3)]">
                                    {activeProject.title}
                                </h2>
                                <span className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest border ${activeProject.category === 'GenAI'
                                    ? 'border-purple-500/50 text-purple-400 bg-purple-500/10'
                                    : 'border-blue-500/50 text-blue-400 bg-blue-500/10'
                                    }`}>
                                    {activeProject.category}
                                </span>
                            </div>
                            <div className="hidden md:block">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                                    <FaCode className="text-2xl text-primary/80" />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex-grow">
                            <p className="text-lg text-secondary/90 leading-relaxed font-light">
                                {activeProject.description}
                            </p>
                        </div>

                        {/* Footer: Tags & Links */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex flex-wrap gap-2 mb-6">
                                {activeProject.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-accent">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectShowcase;
