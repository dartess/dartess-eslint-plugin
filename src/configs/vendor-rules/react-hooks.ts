// This file contains code from the `eslint-config-airbnb` project
// Original author: Jake Teton-Landis (https://twitter.com/@jitl)
// License: MIT (see LICENSE-eslint-config-airbnb.md file)

import type { Linter } from 'eslint';

const rules = {
  /**
   * react-hooks
   * copied from
   * https://github.com/airbnb/javascript/blob/c25bce83be4db06e6a221d79686c485cd2ed5d5d/packages/eslint-config-airbnb/rules/react-hooks.js
   * */

  // Enforce Rules of Hooks
  // https://github.com/facebook/react/blob/c11015ff4f610ac2924d1fc6d569a17657a404fd/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js
  'react-hooks/rules-of-hooks': 'error',

  // Verify the list of the dependencies for Hooks like useEffect and similar
  // https://github.com/facebook/react/blob/1204c789776cb01fbaf3e9f032e7e2ba85a44137/packages/eslint-plugin-react-hooks/src/ExhaustiveDeps.js
  'react-hooks/exhaustive-deps': 'error',
} satisfies Linter.RulesRecord;

export default rules;
