import type { TSESLint } from '@typescript-eslint/utils';

import pluginStorybook from 'eslint-plugin-storybook';

const config: TSESLint.FlatConfig.Config[] = [
  {
    ignores: ['!.storybook'],
  },
  ...pluginStorybook.configs['flat/recommended'],
  ...pluginStorybook.configs['flat/csf-strict'],
  {
    name: '@dartess/storybook',
    files: ['**/*.stories.tsx'],
    rules: {
      'storybook/no-title-property-in-meta': 'off', // generated names may be inappropriate
      '@dartess/stories-export-meta': 'error', // TODO can be replaced with native storybook/meta-satisfies-type ?
      '@dartess/stories-export-typed': 'error',
      '@typescript-eslint/no-explicit-any': 'off', // can be hard for typing in stories
      '@dartess/jsx-text-as-child': 'off', // not necessary in stories
    },
  },
];

export default config;
