import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	output: 'server',
	adapter: vercel(),
	integrations: [mdx(), sitemap()],
  devToolbar: {
    placement: 'bottom-left',
  },
});
