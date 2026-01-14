import React from 'react';
import SkillPill from './SkillPill';
import { skills } from '../data/skills';

const SkillsList: React.FC = () => {
    return (
        <ul className="mt-8 flex flex-wrap gap-2">
            {skills.map((skill) => (
                <SkillPill key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
        </ul>
    );
};

export default SkillsList;
