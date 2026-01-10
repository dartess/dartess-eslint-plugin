import type { TSESLint } from '@typescript-eslint/utils';

const config: Array<TSESLint.FlatConfig.Config> = [
  {
    name: '@dartess/recommended-post-format',
    rules: {
      curly: ['error', 'all'],
    },
  },
];

export default config;
