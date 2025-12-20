// This file contains code from the `eslint-config-next` project
// License: MIT (see LICENSE-next.js.md file)
// Permalink: https://github.com/vercel/next.js/blob/23c4cf0c2ff93b37703e62faf7a1d4700834a0f7/packages/eslint-config-next/index.js

import { Linter } from 'eslint';

const rules = {
  'import-x/no-anonymous-default-export': 'error',
  'react/no-unknown-property': 'off',
  'react/react-in-jsx-scope': 'off',
  'jsx-a11y/alt-text': [
    'error',
    {
      elements: ['img'],
      img: ['Image'],
    },
  ],
  'jsx-a11y/aria-props': 'error',
  'jsx-a11y/aria-proptypes': 'error',
  'jsx-a11y/aria-unsupported-elements': 'error',
  'jsx-a11y/role-has-required-aria-props': 'error',
  'jsx-a11y/role-supports-aria-props': 'error',
  'react/jsx-no-target-blank': 'off',
} satisfies Linter.RulesRecord;

export default rules;
