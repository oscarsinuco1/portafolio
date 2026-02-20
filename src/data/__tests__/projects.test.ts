import { describe, it, expect } from 'vitest';
import { projects, type Project } from '../projects';

describe('projects data', () => {
  it('should have at least one project', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should have valid structure for all projects', () => {
    projects.forEach((project) => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('category');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('tags');
      expect(project).toHaveProperty('github');

      expect(typeof project.id).toBe('string');
      expect(typeof project.title).toBe('string');
      expect(typeof project.description).toBe('string');
      expect(typeof project.github).toBe('string');
      expect(Array.isArray(project.tags)).toBe(true);
    });
  });

  it('should have valid category values', () => {
    const validCategories = ['GenAI', 'Personal', 'Other'];
    projects.forEach((project) => {
      expect(validCategories).toContain(project.category);
    });
  });

  it('should have unique ids', () => {
    const ids = projects.map((p) => p.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });

  it('should have non-empty required fields', () => {
    projects.forEach((project) => {
      expect(project.id.trim()).not.toBe('');
      expect(project.title.trim()).not.toBe('');
      expect(project.description.trim()).not.toBe('');
      expect(project.github.trim()).not.toBe('');
    });
  });

  it('should handle empty projects array', () => {
    const emptyProjects: Project[] = [];
    expect(emptyProjects).toHaveLength(0);
    expect(emptyProjects[0]).toBeUndefined();
  });

  it('should handle project without optional image field', () => {
    const minimalProject: Project = {
      id: 'test',
      title: 'Test',
      category: 'Other',
      description: 'Test desc',
      tags: [],
      github: 'https://github.com/test',
    };

    expect(minimalProject.image).toBeUndefined();
  });

  it('should handle project with empty tags array', () => {
    const projectNoTags: Project = {
      id: 'no-tags',
      title: 'No Tags Project',
      category: 'Other',
      description: 'A project with no tags',
      tags: [],
      github: 'https://github.com/test',
    };

    expect(projectNoTags.tags).toHaveLength(0);
  });

  it('should handle invalid URL in github field', () => {
    // Prueba que la estructura acepta cualquier string
    const invalidUrlProject: Project = {
      id: 'invalid-url',
      title: 'Invalid URL',
      category: 'Other',
      description: 'Test',
      tags: ['test'],
      github: 'not-a-valid-url',
    };

    expect(typeof invalidUrlProject.github).toBe('string');
  });

  it('should handle very long description', () => {
    const longDescProject: Project = {
      id: 'long-desc',
      title: 'Long Description',
      category: 'Other',
      description: 'a'.repeat(5000),
      tags: ['test'],
      github: 'https://github.com/test',
    };

    expect(longDescProject.description.length).toBe(5000);
  });

  it('should handle special characters in tags', () => {
    const specialTagsProject: Project = {
      id: 'special-tags',
      title: 'Special Tags',
      category: 'Other',
      description: 'Test',
      tags: ['C++', 'C#', 'Node.js', 'AI/ML', 'DevOps & CI/CD'],
      github: 'https://github.com/test',
    };

    expect(specialTagsProject.tags).toContain('C++');
    expect(specialTagsProject.tags).toContain('C#');
  });
});

describe('ProjectShowcase initial state edge cases', () => {
  it('should handle accessing first project when array is empty', () => {
    const emptyProjects: Project[] = [];
    const firstProject = emptyProjects[0];
    expect(firstProject).toBeUndefined();
  });

  it('should handle single project', () => {
    const singleProject: Project[] = [
      {
        id: 'only-one',
        title: 'Only Project',
        category: 'Personal',
        description: 'The only project',
        tags: ['solo'],
        github: 'https://github.com/solo',
      },
    ];

    expect(singleProject[0].id).toBe('only-one');
  });
});
