import neostandard from 'neostandard'
import eslintPluginAstro from 'eslint-plugin-astro'
import jsonc from 'eslint-plugin-jsonc'
import tailwind from 'eslint-plugin-tailwindcss'

export default [
  { ignores: ['**/package-lock.json'] },
  ...neostandard({
    ts: true,
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '**/package-lock.json',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
      '*.config.ts'
    ]
  }),
  // Astro: .astro files
  ...eslintPluginAstro.configs.recommended,
  // JSON: .json files
  ...jsonc.configs['recommended-with-json'],
  // Tailwind: sort and lint class names (classnames-order, etc.)
  ...tailwind.configs['flat/recommended']
]
