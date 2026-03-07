/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WHATSAPP_NUMBER: string;
  readonly PUBLIC_INSTAGRAM_URL: string;
  readonly PUBLIC_SPOTIFY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
