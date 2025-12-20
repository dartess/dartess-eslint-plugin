import type { Linter } from 'eslint';
import nextPlugin from '@next/eslint-plugin-next';

import vendorRulesNextConfig from './vendor-rules/next-config.ts';

const config: Array<Linter.Config> = [
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
