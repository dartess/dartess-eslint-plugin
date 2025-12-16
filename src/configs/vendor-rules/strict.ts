// This file contains code from the `eslint-config-airbnb` project
// Original author: Jake Teton-Landis (https://twitter.com/@jitl)
// License: MIT (see LICENSE-eslint-config-airbnb.md file)
// Permalink: https://github.com/airbnb/javascript/blob/c25bce83be4db06e6a221d79686c485cd2ed5d5d/packages/eslint-config-airbnb-base/rules/strict.js

import { Linter } from 'eslint';

const rules = {
  // babel inserts `'use strict';` for us
  strict: ['error', 'never'],
} satisfies Linter.RulesRecord;

export default rules;
