// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://zcalculate.online',
  integrations: [
    sitemap({
      filter: (page) => 
        !page.includes('/api/') && 
        !page.includes('/history') && 
        !page.includes('/comments') &&
        !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date('2026-08-13'),
      priority: 0.7,
      serialize(item) {
        // Homepage gets highest priority
        if (item.url === 'https://zcalculate.online/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Calculator pages get high priority
        else if (item.url.includes('/calculator/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        return item;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
