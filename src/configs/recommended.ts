// This file contains code from the `eslint-config-airbnb` project
// Original author: Jake Teton-Landis (https://twitter.com/@jitl)
// License: MIT (see LICENSE-eslint-config-airbnb.md file)

import tsEslint from 'typescript-eslint';
import globals from 'globals';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import pluginJs from '@eslint/js';
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs';
// @ts-ignore: https://github.com/NullVoxPopuli/eslint-plugin-decorator-position/issues/778
import eslintPluginDecoratorPosition from 'eslint-plugin-decorator-position';
import eslintPluginDeMorgan from 'eslint-plugin-de-morgan';
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

const NO_MIDDLE_ABBRS = '(?!.*[A-Z]{3})';
const NO_END_ABBRS = '(?!.*[A-Z]{2}$)';
const NO_MIDDLE_UNDERSCORE = '(?!.*_{2})';
const EMPTY = `^$`;
const anyCamelCase = `^${NO_MIDDLE_ABBRS}${NO_END_ABBRS}[A-Za-z0-9]+$`;
const lowerCamelCase = `^${NO_MIDDLE_ABBRS}${NO_END_ABBRS}[a-z][A-Za-z0-9]+$`;
const UpperCamelCase = `^${NO_MIDDLE_ABBRS}${NO_END_ABBRS}[A-Z][A-Za-z0-9]+$`;
const snake_case = `^${NO_MIDDLE_UNDERSCORE}[a-z_]+$`;
const UPPER_CASE = `^${NO_MIDDLE_UNDERSCORE}[A-Z0-9_]+$`;

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

  ...(tsEslint.configs.strictTypeChecked as Array<Linter.Config>),
  ...(tsEslint.configs.stylisticTypeChecked as Array<Linter.Config>),

  eslintPluginImportX.flatConfigs.recommended as Linter.Config,
  eslintPluginImportX.flatConfigs.typescript as Linter.Config,

  eslintCommentsPlugin.recommended,

  eslintPluginDeMorgan.configs.recommended,

  {
    name: '@dartess/recommended',

    plugins: {
      unicorn: eslintPluginUnicorn,
      '@dartess': dartessPlugin,

      'decorator-position': eslintPluginDecoratorPosition,
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

      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: true,
          allowUnboundThis: true,
        },
      ],

      /* one line — one decorator */
      'decorator-position/decorator-position': [
        'error',
        {
          properties: 'above',
          methods: 'above',
        },
      ],
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

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          overrides: {
            constructors: 'off',
            accessors: 'explicit',
            methods: 'explicit',
            properties: 'explicit',
            parameterProperties: 'explicit',
          },
        },
      ],

      /* more strict rules then official options */
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: null,
          custom: {
            regex: `${anyCamelCase}|${UPPER_CASE}`,
            match: true,
          },
        },
        {
          selector: 'function',
          format: null,
          custom: {
            regex: anyCamelCase,
            match: true,
          },
        },
        {
          selector: 'parameter',
          format: null,
          custom: {
            regex: `${anyCamelCase}|${snake_case}|${EMPTY}`,
            match: true,
          },
          leadingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: 'method',
          format: null,
          custom: {
            regex: lowerCamelCase,
            match: true,
          },
        },
        {
          selector: 'typeLike',
          format: null,
          custom: {
            regex: UpperCamelCase,
            match: true,
          },
        },
        {
          selector: 'typeParameter',
          format: null,
          custom: {
            regex: `${UpperCamelCase}|${EMPTY}`,
            match: true,
          },
          prefix: ['T'],
        },
      ],

      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowAny: false,
          allowArray: false,
          allowBoolean: false,
          allowNullish: false,
          allowRegExp: false,
          allowNever: false,
        },
      ],

      '@typescript-eslint/array-type': ['error', { default: 'generic' }],

      /* this two rules help with three-shaking */
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      // require names for tuple elements
      '@dartess/ts-named-tuple-elements': 'error',
    },
  },

  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'],
    ...(tsEslint.configs.disableTypeChecked as Linter.Config),
  },

  {
    name: '@dartess/recommended-js',
    files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'],
    rules: {
      // enable for js files only
      'no-throw-literal': 'error',
    },
  },
];

export default config;
