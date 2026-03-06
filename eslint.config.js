import antfu from '@antfu/eslint-config';

export default antfu({
  astro: true,
  typescript: true,
  react: true,

  stylistic: {
    indent: 2,
    semi: true,
    quotes: 'single',
  },

  rules: {
    'style/quotes': ['error', 'single'],
  },
});
