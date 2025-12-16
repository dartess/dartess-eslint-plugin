// This file contains code from the `eslint-config-airbnb-typescript` project
// Original author: Matt Turnbull <matt@iamturns.com> (https://iamturns.com)
// License: MIT (see LICENSE-eslint-config-airbnb-typescript.md file)
// Permalink: https://github.com/iamturns/eslint-config-airbnb-typescript/blob/303e346214847385bee4016367ff3b1b9978e337/lib/shared.js

import { Linter } from 'eslint';

const rules = {
  // The following rules are enabled in Airbnb config, but are already checked (more thoroughly) by the TypeScript compiler
  // Some of the rules also fail in TypeScript files, for example: https://github.com/typescript-eslint/typescript-eslint/issues/662#issuecomment-507081586
  // Rules are inspired by: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
  'valid-typeof': 'off',
  // Disable `import/no-unresolved`, see README.md for details
  'import-x/no-unresolved': 'off',
} satisfies Linter.RulesRecord;

export default rules;
