import type { TSESLint } from '@typescript-eslint/utils';
import nextPlugin from '@next/eslint-plugin-next';

import vendorRulesNextConfig from './vendor-rules/next-config.ts';

const config: TSESLint.FlatConfig.ConfigArray = [
  {
    name: '@dartess/nextjs',

    files: ['**/*.{jsx,tsx}'],

    plugins: {
      '@next/next': nextPlugin,
    },

    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...vendorRulesNextConfig,
    },
  },
];

export default config;
