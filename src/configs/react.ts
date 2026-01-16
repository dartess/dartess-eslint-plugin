import type { TSESLint } from '@typescript-eslint/utils';
import eslintReact from '@eslint-react/eslint-plugin';
import stylisticPlugin from '@stylistic/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

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

  eslintReact.configs['strict-type-checked'],

  reactHooksPlugin.configs.flat.recommended,

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

      '@eslint-react/naming-convention/filename': 'error', // enforce corrent filename

      // disable some recommended rules
      '@eslint-react/prefer-destructuring-assignment': 'off', // can break discriminated union types

      // mark some recommended warns as errors
      '@eslint-react/dom/no-missing-button-type': 'error',
      '@eslint-react/naming-convention/use-state': 'error',
      '@eslint-react/naming-convention/ref-name': 'error',
      '@eslint-react/naming-convention/context-name': 'error',
      '@eslint-react/dom/no-missing-iframe-sandbox': 'error',
      '@eslint-react/dom/no-unsafe-iframe-sandbox': 'error',
      '@eslint-react/jsx-no-comment-textnodes': 'error',
      '@eslint-react/no-unstable-context-value': 'error',
      '@eslint-react/dom/no-script-url': 'error',
      '@eslint-react/dom/no-unsafe-target-blank': 'error',
      '@eslint-react/no-useless-fragment': 'error',
      '@eslint-react/dom/no-dangerously-set-innerhtml': 'error',
      '@eslint-react/no-forward-ref': 'error',

      // enable airbnb-style rules
      '@eslint-react/jsx-shorthand-boolean': 'error',
      '@eslint-react/jsx-shorthand-fragment': 'error',
      '@eslint-react/naming-convention/component-name': 'error',
      '@stylistic/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      '@stylistic/jsx-self-closing-comp': 'error',
    },
  },
];

export default config;
