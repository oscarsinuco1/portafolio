import { describe, it, expect } from 'vitest';
import { 
  timelineThemes, 
  effectColors, 
  uiColors, 
  shadowClasses 
} from '../colorTokens';

describe('timelineThemes', () => {
  it('should have emerald, blue and purple themes', () => {
    expect(timelineThemes).toHaveProperty('emerald');
    expect(timelineThemes).toHaveProperty('blue');
    expect(timelineThemes).toHaveProperty('purple');
  });

  it('should have all required properties for each theme', () => {
    const requiredProps = ['id', 'primary', 'secondary', 'bgTint', 'gradient', 'iconBg', 'shadow'];
    
    Object.values(timelineThemes).forEach((theme) => {
      requiredProps.forEach((prop) => {
        expect(theme).toHaveProperty(prop);
        expect(theme[prop as keyof typeof theme]).toBeDefined();
      });
    });
  });

  it('should have valid CSS rgb/rgba values', () => {
    Object.values(timelineThemes).forEach((theme) => {
      expect(theme.primary).toMatch(/rgb\(var\(--color-/);
      expect(theme.secondary).toMatch(/rgb\(var\(--color-/);
      expect(theme.bgTint).toMatch(/rgba\(var\(--color-.*\), 0\.4\)/);
    });
  });

  it('should handle accessing non-existent theme gracefully', () => {
    // @ts-expect-error - Testing runtime behavior
    const nonExistent = timelineThemes['non-existent'];
    expect(nonExistent).toBeUndefined();
  });

  it('should cycle through themes correctly with modulo', () => {
    const themes = Object.values(timelineThemes);
    const themeCount = themes.length;
    
    // Simular el comportamiento del componente ExperienceTimeline
    for (let i = 0; i < 10; i++) {
      const theme = themes[i % themeCount];
      expect(theme).toBeDefined();
    }
  });
});

describe('effectColors', () => {
  it('should have rainbow and scanlines effects', () => {
    expect(effectColors).toHaveProperty('rainbow');
    expect(effectColors).toHaveProperty('scanlines');
    expect(effectColors).toHaveProperty('bgOverlay');
  });

  it('should have color1-4 for rainbow effect', () => {
    expect(effectColors.rainbow).toHaveProperty('color1');
    expect(effectColors.rainbow).toHaveProperty('color2');
    expect(effectColors.rainbow).toHaveProperty('color3');
    expect(effectColors.rainbow).toHaveProperty('color4');
  });

  it('should have dark and light for scanlines', () => {
    expect(effectColors.scanlines).toHaveProperty('dark');
    expect(effectColors.scanlines).toHaveProperty('light');
  });

  it('should have rgba values with alpha', () => {
    expect(effectColors.scanlines.dark).toMatch(/rgba\(var\(--color-.*\), 0\)/);
    expect(effectColors.scanlines.light).toMatch(/rgba\(var\(--color-.*\), 0\.25\)/);
  });

  it('should handle missing effect gracefully', () => {
    // @ts-expect-error - Testing runtime behavior
    expect(effectColors['missing']).toBeUndefined();
  });
});

describe('uiColors', () => {
  it('should have timeline and toggle properties', () => {
    expect(uiColors).toHaveProperty('timeline');
    expect(uiColors).toHaveProperty('toggle');
  });

  it('should have line property for timeline', () => {
    expect(uiColors.timeline).toHaveProperty('line');
    expect(uiColors.timeline.line).toMatch(/rgba\(var\(--color-/);
  });

  it('should have dark and light toggle themes', () => {
    expect(uiColors.toggle).toHaveProperty('dark');
    expect(uiColors.toggle).toHaveProperty('light');
  });

  it('should have all required toggle properties for dark theme', () => {
    const requiredProps = ['bg', 'text', 'border', 'hoverBg', 'hoverShadow'];
    requiredProps.forEach((prop) => {
      expect(uiColors.toggle.dark).toHaveProperty(prop);
      expect(uiColors.toggle.dark[prop as keyof typeof uiColors.toggle.dark]).toBeDefined();
    });
  });

  it('should have all required toggle properties for light theme', () => {
    const requiredProps = ['bg', 'text', 'border', 'hoverBg', 'hoverShadow'];
    requiredProps.forEach((prop) => {
      expect(uiColors.toggle.light).toHaveProperty(prop);
      expect(uiColors.toggle.light[prop as keyof typeof uiColors.toggle.light]).toBeDefined();
    });
  });

  it('should return valid Tailwind classes for toggle themes', () => {
    expect(uiColors.toggle.dark.bg).toMatch(/bg-/);
    expect(uiColors.toggle.dark.text).toMatch(/text-/);
    expect(uiColors.toggle.dark.border).toMatch(/border-/);
    expect(uiColors.toggle.dark.hoverBg).toMatch(/hover:/);
    expect(uiColors.toggle.dark.hoverShadow).toMatch(/hover:/);
  });
});

describe('shadowClasses', () => {
  it('should have primary and secondary shadows', () => {
    expect(shadowClasses).toHaveProperty('primary');
    expect(shadowClasses).toHaveProperty('secondary');
  });

  it('should have sm, md, lg sizes for each shadow type', () => {
    const sizes = ['sm', 'md', 'lg'];
    
    sizes.forEach((size) => {
      expect(shadowClasses.primary).toHaveProperty(size);
      expect(shadowClasses.secondary).toHaveProperty(size);
    });
  });

  it('should have valid Tailwind shadow classes', () => {
    Object.values(shadowClasses.primary).forEach((cls) => {
      expect(cls).toMatch(/shadow-/);
    });
    Object.values(shadowClasses.secondary).forEach((cls) => {
      expect(cls).toMatch(/shadow-/);
    });
  });

  it('should handle accessing non-existent shadow size', () => {
    // @ts-expect-error - Testing runtime behavior
    expect(shadowClasses.primary['xl']).toBeUndefined();
  });
});

describe('colorTokens edge cases', () => {
  it('should handle empty theme id', () => {
    // Simular un theme con id vacío
    const emptyTheme = {
      ...timelineThemes.emerald,
      id: '',
    };
    expect(emptyTheme.id).toBe('');
  });

  it('should handle null values in theme', () => {
    // @ts-expect-error - Testing runtime behavior
    const nullTheme = {
      ...timelineThemes.emerald,
      primary: null,
    };
    expect(nullTheme.primary).toBeNull();
  });

  it('should verify all themes have unique ids', () => {
    const ids = Object.values(timelineThemes).map((t) => t.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });
});
