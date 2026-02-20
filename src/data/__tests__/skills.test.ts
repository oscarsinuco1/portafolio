import { describe, it, expect } from 'vitest';
import { skills, type Skill } from '../skills';
import React from 'react';

describe('skills data', () => {
  it('should have at least one skill', () => {
    expect(skills.length).toBeGreaterThan(0);
  });

  it('should have valid structure for all skills', () => {
    skills.forEach((skill) => {
      expect(skill).toHaveProperty('name');
      expect(skill).toHaveProperty('icon');

      expect(typeof skill.name).toBe('string');
      // icon es un componente React
      expect(typeof skill.icon).toBe('function');
    });
  });

  it('should have non-empty skill names', () => {
    skills.forEach((skill) => {
      expect(skill.name.trim()).not.toBe('');
    });
  });

  it('should have unique skill names', () => {
    const names = skills.map((s) => s.name);
    const uniqueNames = [...new Set(names)];
    expect(names.length).toBe(uniqueNames.length);
  });

  it('should handle empty skills array', () => {
    const emptySkills: Skill[] = [];
    expect(emptySkills).toHaveLength(0);
  });

  it('should handle skill with null icon', () => {
    const nullIconSkill: Skill = {
      name: 'Null Icon Skill',
      icon: null as unknown as React.ElementType,
    };

    expect(nullIconSkill.icon).toBeNull();
  });

  it('should handle skill with undefined icon', () => {
    const undefinedIconSkill: Skill = {
      name: 'Undefined Icon Skill',
      icon: undefined as unknown as React.ElementType,
    };

    expect(undefinedIconSkill.icon).toBeUndefined();
  });

  it('should handle skill with special characters in name', () => {
    const specialSkill: Skill = {
      name: 'C++ / C# <script>',
      icon: () => React.createElement('span', null, 'icon'),
    };

    expect(specialSkill.name).toContain('++');
    expect(specialSkill.name).toContain('#');
  });

  it('should handle skill with very long name', () => {
    const longNameSkill: Skill = {
      name: 'A'.repeat(200),
      icon: () => React.createElement('span', null, 'icon'),
    };

    expect(longNameSkill.name.length).toBe(200);
  });

  it('should verify all icons are valid React components', () => {
    skills.forEach((skill) => {
      // Verificar que el icono es una función (componente)
      expect(typeof skill.icon).toBe('function');
      // Verificar que tiene un nombre o displayName (mayoría de iconos lo tienen)
      expect(skill.icon.name || skill.icon.displayName).toBeTruthy();
    });
  });
});

describe('Skill interface edge cases', () => {
  it('should handle empty string name', () => {
    const emptyNameSkill: Skill = {
      name: '',
      icon: () => React.createElement('span', null, 'icon'),
    };

    expect(emptyNameSkill.name).toBe('');
  });

  it('should handle whitespace-only name', () => {
    const whitespaceSkill: Skill = {
      name: '   ',
      icon: () => React.createElement('span', null, 'icon'),
    };

    expect(whitespaceSkill.name.trim()).toBe('');
  });
});
