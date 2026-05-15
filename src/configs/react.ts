import { createRequire } from 'node:module';

import type { TSESLint } from '@typescript-eslint/utils';
import eslintReact from '@eslint-react/eslint-plugin';
import stylisticPlugin from '@stylistic/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yXPlugin from 'eslint-plugin-jsx-a11y-x';
import type { PackageJson } from 'type-fest';
import semver from 'semver';

import vendorRulesReact from './vendor-rules/react-a11y.ts';
import { convertWarnsToErrorsIfNeeded } from './utils/convertWarnsToErrorsIfNeeded.ts';

const require = createRequire(import.meta.url);
const { version = '0.0.0' } = require('@eslint-react/eslint-plugin/package.json') as PackageJson;

const getEslintReactRules = () => {
  if (semver.satisfies(version, '^4.0.0')) {
    return {
      '@eslint-react/naming-convention-filename': 'error', // enforce corrent filename // v4 rename
      // '@eslint-react/jsx-shorthand-boolean': 'error', // TODO how to re-implement? was removed in v4 https://github.com/Rel1cx/eslint-react/issues/1243
      // '@eslint-react/jsx-shorthand-fragment': 'error', // TODO how to re-implement? was removed in v4 https://github.com/Rel1cx/eslint-react/issues/1243
    } as const;
  }
  if (semver.satisfies(version, '^3.0.0')) {
    return {
      '@eslint-react/naming-convention/filename': 'error',
      '@eslint-react/jsx-shorthand-boolean': 'error',
      '@eslint-react/jsx-shorthand-fragment': 'error',
    } as const;
  }
  // ^2.0.0
  return {
    '@eslint-react/naming-convention/filename': 'error',
    '@eslint-react/naming-convention/component-name': 'error',
    '@eslint-react/jsx-shorthand-boolean': 'error',
    '@eslint-react/jsx-shorthand-fragment': 'error',
  } as const;
};

const config: TSESLint.FlatConfig.ConfigArray = [
  {
    name: '@dartess/react-setup',

    plugins: {
      'react-hooks': reactHooksPlugin,
      '@stylistic': stylisticPlugin,
    },

    settings: {
      'react-x': {
        version: 'detect',
      },
    },
  },

  convertWarnsToErrorsIfNeeded(eslintReact.configs['strict-type-checked']),

  convertWarnsToErrorsIfNeeded(reactHooksPlugin.configs.flat.recommended),

  convertWarnsToErrorsIfNeeded(jsxA11yXPlugin.configs.recommended),

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
    },

    rules: {
      ...vendorRulesReact,

      // TODO: try to enable this rules later (if needed)
      'jsx-a11y-x/click-events-have-key-events': 'off',
      'jsx-a11y-x/anchor-is-valid': 'off',
      'jsx-a11y-x/interactive-supports-focus': 'off',
      // TODO END: try to enable this rules later (if needed)

      'jsx-a11y-x/no-static-element-interactions': 'off', // TODO enable later
      'jsx-a11y-x/no-noninteractive-tabindex': 'off', // TODO enable later
      'jsx-a11y-x/no-noninteractive-element-interactions': 'off', // TODO enable later
      'jsx-a11y-x/label-has-associated-control': 'off', // TODO enable later but with `assert`=`either`

      // disable some recommended rules
      '@eslint-react/prefer-destructuring-assignment': 'off', // can break discriminated union types

      // enable airbnb-style rules
      '@stylistic/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      '@stylistic/jsx-self-closing-comp': 'error',

      '@dartess/no-props-with-children-type': 'error',

      ...getEslintReactRules(),
    },
  },
];

export default config;
