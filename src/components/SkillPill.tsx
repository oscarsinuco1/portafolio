import React from 'react';

interface SkillPillProps {
    name: string;
    icon: React.ElementType;
}

const SkillPill: React.FC<SkillPillProps> = ({ name, icon: Icon }) => {
    if (!Icon) {
        console.error(`SkillPill: Icon for "${name}" is null or undefined.`);
        return null;
    }
    return (
        <div className="flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-sm font-medium leading-5 text-accent hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-default shadow-sm border border-transparent hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--color-primary),0.3)] hover:text-primary">
            <Icon className="text-xl" />
            <span>{name}</span>
        </div>
    );
};

export default SkillPill;
