import react from '@astrojs/react';
import vercelServerless from '@astrojs/vercel/serverless';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  adapter: vercelServerless({
    imageService: true,
    edgeMiddleware: true,
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
