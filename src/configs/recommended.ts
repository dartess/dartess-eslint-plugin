// This file contains code from the `eslint-config-airbnb` project
// Original author: Jake Teton-Landis (https://twitter.com/@jitl)
// License: MIT (see LICENSE-eslint-config-airbnb.md file)

import tsEslint from 'typescript-eslint';
import globals from 'globals';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import pluginJs from '@eslint/js';
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs';
import type { Linter } from 'eslint';
import type { TSESLint } from '@typescript-eslint/utils';

import dartessPlugin from '../index.ts';
import vendorRulesBestPractices from './vendor-rules/best-practices.ts';
import vendorRulesErrors from './vendor-rules/errors.ts';
import vendorRulesStyle from './vendor-rules/style.ts';
import vendorRulesVariables from './vendor-rules/variables.ts';
import vendorRulesEs6 from './vendor-rules/es6.ts';
import vendorRulesImports from './vendor-rules/imports.ts';
import vendorRulesStrict from './vendor-rules/strict.ts';
import vendorRulesTypescriptDisablings from './vendor-rules/typescript-disablings.ts';
import vendorRulesTypescript from './vendor-rules/typescript.ts';

const config: TSESLint.FlatConfig.ConfigArray = [
  {
    name: '@dartess/recommended/enable-report-unused-disable-directives',
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },

  {
    name: '@eslint/js/recommended',
    ...pluginJs.configs.recommended,
  },

  ...(tsEslint.configs.strictTypeChecked as Linter.Config[]),
  ...(tsEslint.configs.stylisticTypeChecked as Linter.Config[]),

  eslintPluginImportX.flatConfigs.recommended as Linter.Config,
  eslintPluginImportX.flatConfigs.typescript as Linter.Config,

  eslintCommentsPlugin.recommended,

  {
    name: '@dartess/recommended',

    plugins: {
      unicorn: eslintPluginUnicorn,
      '@dartess': dartessPlugin,
    },

    languageOptions: {
      parser: tsEslint.parser as Linter.Parser,
      globals: {
        ...globals.browser,
      },
    },

    settings: {
      'import-x/core-modules': [],
      'import-x/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],
    },

    rules: {
      ...vendorRulesBestPractices,
      ...vendorRulesErrors,
      ...vendorRulesStyle,
      ...vendorRulesVariables,
      ...vendorRulesEs6,
      ...vendorRulesImports,
      ...vendorRulesStrict,

      /* restricts console outputs to essential log levels for cleaner logs */
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],

      /* permits file-wide rule control to streamline exceptional cases */
      '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
      /* obliges to describe the reason for disconnection */
      '@eslint-community/eslint-comments/require-description': [
        'error',
        {
          ignore: [],
        },
      ],

      'unicorn/no-useless-undefined': 'error',
      'unicorn/prefer-node-protocol': 'error',

      '@dartess/max-parent-import-depth': 'error',
    },
  },

  {
    name: '@dartess/recommended-ts',
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    rules: {
      ...vendorRulesTypescriptDisablings,
      ...vendorRulesTypescript,

      /* ensures ts-ignore is accompanied by a description for proper justification */
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],

      /* enforces consistent type alias declarations for improved clarity */
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      /* index signature can be more informative */
      '@typescript-eslint/consistent-indexed-object-style': 'off',

      /* can be false-positive */
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',

      /* can be false-positive -- TODO can be enabled after `noUncheckedIndexedAccess` */
      '@typescript-eslint/no-unnecessary-condition': 'off',

      /* can be false-positive */
      '@typescript-eslint/no-floating-promises': 'off',

      /* can be false-positive */
      '@typescript-eslint/no-misused-promises': 'off',

      /* can be false-positive */
      '@typescript-eslint/prefer-nullish-coalescing': 'off',

      /* slow; not much use */
      '@typescript-eslint/no-deprecated': 'off',
    },
  },

  {
    files: ['**/*.js'],
    ...(tsEslint.configs.disableTypeChecked as Linter.Config),
  },
];

export default config;
