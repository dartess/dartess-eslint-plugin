// This file contains code from the `eslint-config-airbnb` project
// Original author: Jake Teton-Landis (https://twitter.com/@jitl)
// License: MIT (see LICENSE-eslint-config-airbnb.md file)
// Permalink: https://github.com/airbnb/javascript/blob/c25bce83be4db06e6a221d79686c485cd2ed5d5d/packages/eslint-config-airbnb-base/rules/variables.js

import confusingBrowserGlobals from 'confusing-browser-globals';
import { Linter } from 'eslint';

const rules = {
  // disallow deletion of variables
  'no-delete-var': 'error',

  // disallow labels that share a name with a variable
  // https://eslint.org/docs/rules/no-label-var
  'no-label-var': 'error',

  // disallow specific globals
  'no-restricted-globals': [
    'error',
    {
      name: 'isFinite',
      message:
        'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
    },
    {
      name: 'isNaN',
      message:
        'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
    },
    ...confusingBrowserGlobals.map(g => ({
      name: g,
      message: `Use window.${g} instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md`,
    })),
  ],

  // disallow declaration of variables already declared in the outer scope
  'no-shadow': 'error',

  // disallow shadowing of names such as arguments
  'no-shadow-restricted-names': 'error',

  // disallow use of undefined when initializing variables
  'no-undef-init': 'error',

  // disallow declaration of variables that are not used in the code
  'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

  // disallow use of variables before they are defined
  'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],
} satisfies Linter.RulesRecord;

export default rules;
