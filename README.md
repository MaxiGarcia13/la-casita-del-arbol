# La Casita del Árbol

A website for **La Casita del Árbol**, a creative ceramic studio in La Plata, Argentina. The site showcases ceramic classes, handcrafted products, and events, and connects visitors with the studio via WhatsApp and Instagram.

![La Casita del Árbol — Contact](public/assets/img/girl.webp)

---

## Technology

The project is built with a **static-first, hybrid** setup:

| Tech                                             | Role                                                                                                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **[Astro](https://astro.build)** (v5)            | Main framework. Most pages are static HTML; React is used only where interactivity is needed (e.g. calendar, event list).                                          |
| **[React](https://react.dev)** (v19)             | Used for interactive components: event calendar and upcoming events list. Integrated via `@astrojs/react` with `client:only="react"` / `client:load` where needed. |
| **[Tailwind CSS](https://tailwindcss.com)** (v4) | Styling via `@tailwindcss/vite`. Utility-first CSS and design tokens (e.g. `bg-surface`, `text-charcoal`, `border-accent`).                                        |
| **[Vercel](https://vercel.com)**                 | Deployment via `@astrojs/vercel`. The app is configured with `output: 'server'` for optional server-side features.                                                 |

### Project structure (high level)

- **`src/`** — Astro pages, layouts, and components (`.astro` + React `.tsx`).
- **`public/`** — Static assets; the hero image lives at `public/assets/img/girl.webp`.
- **`astro.config.mjs`** — Astro config with React integration, Tailwind (Vite plugin), and Vercel adapter.

### Scripts

```bash
npm run dev      # Local dev server
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # ESLint
npm run format   # ESLint with auto-fix
```
