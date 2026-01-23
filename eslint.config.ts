import type { TSESLint } from '@typescript-eslint/utils';
import tsEslint from 'typescript-eslint';
import globals from 'globals';
import eslintPluginPlugin from 'eslint-plugin-eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';

import dartessEslintPluginRecommended from './src/configs/recommended.ts';
import dartessEslintPluginPostFormat from './src/configs/post-format.ts';

const config: TSESLint.FlatConfig.ConfigArray = [
  {
    ignores: ['dist/**/*'],
  },
  {
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
    },
  },
  {
    ignores: ['lib/vendor-plugins/**/*'],
    ...eslintPluginPlugin.configs.recommended,
  },
  ...dartessEslintPluginRecommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'commonjs',
      ecmaVersion: 2023,
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  },
  eslintConfigPrettier,
  ...dartessEslintPluginPostFormat,
  {
    rules: {
      'import-x/no-nodejs-modules': 'off', // it's node.js project
      'import-x/extensions': ['error', 'ignorePackages'],
      'func-names': 'off', // can be bad for RuleListener
      'no-continue': 'off', // OK for this package
      '@typescript-eslint/naming-convention': 'off', // because of required naming
    },
  },

  {
    files: ['tests/**/*.ts'],
    rules: {
      'import-x/extensions': 'off',
    },
  },
];

export default config;
