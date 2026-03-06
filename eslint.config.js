import eslintPluginAstro from 'eslint-plugin-astro';
import jsonc from 'eslint-plugin-jsonc';
import neostandard from 'neostandard';
import tailwind from 'eslint-plugin-tailwindcss';

export default [
  { ignores: ['**/package-lock.json'] },
  ...neostandard({
    ts: true,
    semi: true,
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '**/package-lock.json',
    ]
  }),
  // Astro: .astro files
  ...eslintPluginAstro.configs.recommended,
  // JSON: .json files
  ...jsonc.configs['recommended-with-json'],
  // Tailwind: sort and lint class names (classnames-order, etc.)
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'sort-imports': ['error', {
        ignoreCase: true,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true
      }],
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          whitelist: [
            'text-charcoal',
            'bg-surface',
            'text-primary',
            'bg-primary',
            'text-secondary',
            'bg-secondary',
            'text-accent',
            'bg-accent',
            'border-charcoal',
          ]
        },
      ],
    },
  },
];
