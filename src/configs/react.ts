// This file contains code from the `eslint-config-airbnb` project
// Original author: Jake Teton-Landis (https://twitter.com/@jitl)
// License: MIT (see LICENSE-eslint-config-airbnb.md file)

import type { Linter } from 'eslint';
import reactPlugin from 'eslint-plugin-react';

import vendorRulesReact from './vendor-rules/react.ts';

import vendorRulesReactHooks from './vendor-rules/react-hooks.ts';

const config: Linter.Config[] = [
  reactPlugin.configs.flat.recommended,

  {
    name: '@dartess/eslint-plugin-react/jsx-runtime',
    files: ['**/*.{jsx,tsx}'],
    ...reactPlugin.configs.flat['jsx-runtime'],
  },

  {
    name: '@dartess/react',

    files: ['**/*.{jsx,tsx}'],

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      // Append 'ts' extensions to Airbnb 'import-x/resolver' setting
      // Prepend 'mjs' to match shared config
      // Original: ['.js', '.jsx', '.json']
      'import-x/resolver': {
        node: {
          extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
        },
      },
      react: {
        version: 'detect',
      },
    },

    rules: {
      ...vendorRulesReact,

      // too hard for fixing, TODO maybe try later?
      'react/jsx-props-no-spreading': 'off',

      // TODO: try to enable this rules later (if needed)
      'react/require-default-props': 'off',
      'react/no-unstable-nested-components': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/interactive-supports-focus': 'off',
      // TODO END: try to enable this rules later (if needed)

      'jsx-a11y/no-static-element-interactions': 'off', // TODO enable later
      'jsx-a11y/no-noninteractive-tabindex': 'off', // TODO enable later
      'jsx-a11y/no-noninteractive-element-interactions': 'off', // TODO enable later
      'jsx-a11y/label-has-associated-control': 'off', // TODO enable later but with `assert`=`either`

      // Append 'tsx' to Airbnb 'react/jsx-filename-extension' rule
      // Original: ['.jsx']
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

      // overrides
      'react/jsx-no-duplicate-props': 'off', // checked by typescript
      'react/jsx-no-undef': 'off', // checked by typescript
    },
  },

  {
    name: '@dartess/react-hooks',

    rules: {
      ...vendorRulesReactHooks,
    },
  },
];

export default config;
