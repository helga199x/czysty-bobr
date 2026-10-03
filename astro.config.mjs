import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export default defineConfig({
  site: process.env.SITE_URL || env.SITE_URL || 'https://helga199x.github.io',
  base: '/czysty-bobr',
  trailingSlash: 'always',
  output: 'static',
});
