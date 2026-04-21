import { createRequire } from 'node:module';

import type { TSESLint } from '@typescript-eslint/utils';
import eslintReact from '@eslint-react/eslint-plugin';
import stylisticPlugin from '@stylistic/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import type { PackageJson } from 'type-fest';
import semver from 'semver';

import { convertWarnsToErrorsIfNeeded } from './utils/convertWarnsToErrorsIfNeeded.ts';

const require = createRequire(import.meta.url);
const { version = '0.0.0' } = require('@eslint-react/eslint-plugin/package.json') as PackageJson;

const getEslintReactRules = () => {
  if (semver.satisfies(version, '^4.0.0')) {
    return {
      '@eslint-react/naming-convention-filename': 'error', // enforce corrent filename // v4 rename
      // '@eslint-react/naming-convention/component-name': 'error', // TODO how to re-implement? was removed in v3 https://github.com/Rel1cx/eslint-react/releases/tag/v3.0.0-rc.0
      // '@eslint-react/jsx-shorthand-boolean': 'error', // TODO how to re-implement? was removed in v4 https://github.com/Rel1cx/eslint-react/issues/1243
      // '@eslint-react/jsx-shorthand-fragment': 'error', // TODO how to re-implement? was removed in v4 https://github.com/Rel1cx/eslint-react/issues/1243
    } as const;
  }
  if (semver.satisfies(version, '^3.0.0')) {
    return {
      '@eslint-react/naming-convention/filename': 'error', // enforce corrent filename
      // '@eslint-react/naming-convention/component-name': 'error', // TODO how to re-implement? was removed in v3 https://github.com/Rel1cx/eslint-react/releases/tag/v3.0.0-rc.0
      '@eslint-react/jsx-shorthand-boolean': 'error',
      '@eslint-react/jsx-shorthand-fragment': 'error',
    } as const;
  }
  // ^2.0.0
  return {
    '@eslint-react/naming-convention/filename': 'error', // enforce corrent filename
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
      'jsx-a11y': jsxA11yPlugin,
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
      // TODO: try to enable this rules later (if needed)
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/interactive-supports-focus': 'off',
      // TODO END: try to enable this rules later (if needed)

      'jsx-a11y/no-static-element-interactions': 'off', // TODO enable later
      'jsx-a11y/no-noninteractive-tabindex': 'off', // TODO enable later
      'jsx-a11y/no-noninteractive-element-interactions': 'off', // TODO enable later
      'jsx-a11y/label-has-associated-control': 'off', // TODO enable later but with `assert`=`either`

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
