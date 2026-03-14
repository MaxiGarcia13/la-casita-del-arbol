import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  output: 'server',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
  server: {
    port: 4322,
  },
  env: {
    schema: {
      BOOKLY_API_URL_V1: envField.string({
        context: 'server',
        access: 'secret',
      }),
      BOOKLY_INSTANCE_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),
      WHATSAPP_NUMBER: envField.string({
        context: 'client',
        access: 'public',
      }),
      INSTAGRAM_URL: envField.string({
        context: 'client',
        access: 'public',
      }),
      SPOTIFY_URL: envField.string({
        context: 'client',
        access: 'public',
      }),
    },
  },
});
