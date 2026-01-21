import type { TSESLint } from '@typescript-eslint/utils';

const config: TSESLint.FlatConfig.ConfigArray = [
  {
    name: '@dartess/recommended-post-format',
    rules: {
      curly: ['error', 'all'],
    },
  },
];

export default config;
