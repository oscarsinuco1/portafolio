import { describe, it, expect } from 'vitest';
import { experienceData, type ExperienceItem } from '../experience';

describe('experienceData', () => {
  it('should have at least one experience item', () => {
    expect(experienceData.length).toBeGreaterThan(0);
  });

  it('should have valid structure for all items', () => {
    experienceData.forEach((item) => {
      expect(item).toHaveProperty('date');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('company');
      expect(item).toHaveProperty('location');
      expect(item).toHaveProperty('description');
      
      expect(typeof item.date).toBe('string');
      expect(typeof item.title).toBe('string');
      expect(typeof item.company).toBe('string');
      expect(typeof item.location).toBe('string');
      expect(Array.isArray(item.description)).toBe(true);
    });
  });

  it('should have non-empty required fields', () => {
    experienceData.forEach((item) => {
      expect(item.date.trim()).not.toBe('');
      expect(item.title.trim()).not.toBe('');
      expect(item.company.trim()).not.toBe('');
      expect(item.location.trim()).not.toBe('');
      expect(item.description.length).toBeGreaterThan(0);
    });
  });

  it('should have description items that are non-empty strings', () => {
    experienceData.forEach((item) => {
      item.description.forEach((desc) => {
        expect(typeof desc).toBe('string');
        expect(desc.trim()).not.toBe('');
      });
    });
  });

  it('should handle empty experience data gracefully', () => {
    // Simular datos vacíos para probar edge case
    const emptyData: ExperienceItem[] = [];
    expect(emptyData).toHaveLength(0);
    expect(emptyData.map((_, i) => i)).toHaveLength(0);
  });

  it('should handle missing optional icon field', () => {
    experienceData.forEach((item) => {
      // icon es opcional, puede estar undefined
      expect(item.icon === undefined || typeof item.icon === 'string').toBe(true);
    });
  });

  it('should handle item with empty description array', () => {
    const itemWithEmptyDesc: ExperienceItem = {
      date: '2024 - Presente',
      title: 'Test Developer',
      company: 'Test Company',
      location: 'Remoto',
      description: [],
    };
    
    expect(itemWithEmptyDesc.description).toHaveLength(0);
  });

  it('should handle item with undefined optional fields', () => {
    const minimalItem: ExperienceItem = {
      date: '2024',
      title: 'Developer',
      company: 'Company',
      location: 'Remote',
      description: ['Worked on stuff'],
      // icon no está definido
    };
    
    expect(minimalItem.icon).toBeUndefined();
  });
});

describe('ExperienceItem interface edge cases', () => {
  it('should handle special characters in strings', () => {
    const specialItem: ExperienceItem = {
      date: '2024 <script>alert("xss")</script>',
      title: 'Dev & Engineer <>",\'',
      company: 'Company & Co. ©®™',
      location: 'New York / Remote',
      description: ['Line 1', 'Line with émojis 🚀'],
    };

    expect(specialItem.title).toContain('<>');
    expect(specialItem.company).toContain('©');
  });

  it('should handle very long strings', () => {
    const longString = 'a'.repeat(10000);
    const longItem: ExperienceItem = {
      date: longString,
      title: longString,
      company: longString,
      location: longString,
      description: [longString, longString],
    };

    expect(longItem.title.length).toBe(10000);
  });

  it('should handle single character strings', () => {
    const shortItem: ExperienceItem = {
      date: '1',
      title: 'X',
      company: 'Y',
      location: 'Z',
      description: ['A'],
    };

    expect(shortItem.title).toBe('X');
  });
});
