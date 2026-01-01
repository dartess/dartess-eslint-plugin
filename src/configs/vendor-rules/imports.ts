// This file contains code from the `eslint-config-airbnb` project
// Original author: Jake Teton-Landis (https://twitter.com/@jitl)
// License: MIT (see LICENSE-eslint-config-airbnb.md file)
// Permalink: https://github.com/airbnb/javascript/blob/c25bce83be4db06e6a221d79686c485cd2ed5d5d/packages/eslint-config-airbnb-base/rules/imports.js

import type { Linter } from 'eslint';

const rules = {
  // Static analysis:

  // ensure imports point to files/modules that can be resolved
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
  'import-x/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],

  // ensure default import coupled with default export
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/default.md#when-not-to-use-it
  'import-x/default': 'off',

  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/namespace.md
  'import-x/namespace': 'off',

  // Helpful warnings:

  // do not allow a default import name to match a named export
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
  'import-x/no-named-as-default': 'error',

  // Forbid the use of extraneous packages
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
  // paths are treated both as absolute paths, and relative to process.cwd()
  'import-x/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        'test/**', // tape, common npm pattern
        'tests/**', // also common npm pattern
        'spec/**', // mocha, rspec-like pattern
        'scripts/**', // custom infra scripts
        '**/__tests__/**', // jest pattern
        '**/__mocks__/**', // jest pattern
        'test.{js,jsx}', // repos with a single test file
        'test-*.{js,jsx}', // repos with multiple top-level test files
        '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
        '**/jest.setup.js', // jest setup
        '**/gulpfile.js', // gulp config
        '**/gulpfile.*.js', // gulp config
        '**/Gruntfile{,.js}', // grunt config
        '**/.eslintrc.js', // eslint config
        '**/*.conf{,ig}.js', // any configs
        '**/*.conf{,ig}.*.js', // any configs
        '**/*.stories.jsx', // storybook stories
      ],
      optionalDependencies: false,
    },
  ],

  // Forbid mutable exports
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
  'import-x/no-mutable-exports': 'error',

  // Module systems:

  // disallow AMD require/define
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-amd.md
  'import-x/no-amd': 'error',

  // No Node.js builtin modules
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md
  'import-x/no-nodejs-modules': 'error',

  // Style guide:

  // disallow non-import statements appearing before import statements
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/first.md
  'import-x/first': 'error',

  // disallow duplicate imports
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
  'import-x/no-duplicates': 'error',

  // Ensure consistent use of file extension within the import path
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/extensions.md
  'import-x/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
    },
  ],

  // Require a newline after the last import/require in a group
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
  'import-x/newline-after-import': 'error',

  // Forbid import of modules using absolute paths
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
  'import-x/no-absolute-path': 'error',

  // Forbid require() calls with expressions
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
  'import-x/no-dynamic-require': 'error',

  // Forbid Webpack loader syntax in imports
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
  'import-x/no-webpack-loader-syntax': 'error',

  // Prevent importing the default as if it were named
  // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
  'import-x/no-named-default': 'error',

  // Forbid a module from importing itself
  // https://github.com/import-js/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/no-self-import.md
  'import-x/no-self-import': 'error',

  // Forbid cyclical dependencies between modules
  // https://github.com/import-js/eslint-plugin-import/blob/d81f48a2506182738409805f5272eff4d77c9348/docs/rules/no-cycle.md
  'import-x/no-cycle': ['error', { maxDepth: '∞' }],

  // Ensures that there are no useless path segments
  // https://github.com/import-js/eslint-plugin-import/blob/ebafcbf59ec9f653b2ac2a0156ca3bcba0a7cf57/docs/rules/no-useless-path-segments.md
  'import-x/no-useless-path-segments': ['error', { commonjs: true }],

  // Reports the use of import declarations with CommonJS exports in any module except for the main module.
  // https://github.com/import-js/eslint-plugin-import/blob/1012eb951767279ce3b540a4ec4f29236104bb5b/docs/rules/no-import-module-exports.md
  'import-x/no-import-module-exports': [
    'error',
    {
      exceptions: [],
    },
  ],

  // Use this rule to prevent importing packages through relative paths.
  // https://github.com/import-js/eslint-plugin-import/blob/1012eb951767279ce3b540a4ec4f29236104bb5b/docs/rules/no-relative-packages.md
  'import-x/no-relative-packages': 'error',

  // Reports the use of empty named import blocks.
  // https://github.com/import-js/eslint-plugin-import/blob/d5fc8b670dc8e6903dbb7b0894452f60c03089f5/docs/rules/no-empty-named-blocks.md
  'import-x/no-empty-named-blocks': 'error',
} satisfies Linter.RulesRecord;

export default rules;
