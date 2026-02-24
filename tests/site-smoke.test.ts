import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

describe('project smoke checks', () => {
  test('astro config enables sitemap integration', () => {
    const astroConfig = readFileSync(resolve(process.cwd(), 'astro.config.mjs'), 'utf8');
    expect(astroConfig).toContain('@astrojs/sitemap');
  });
});
