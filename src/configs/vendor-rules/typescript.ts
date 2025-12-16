// This file contains code from the `eslint-config-airbnb-typescript` project
// Original author: Matt Turnbull <matt@iamturns.com> (https://iamturns.com)
// License: MIT (see LICENSE-eslint-config-airbnb-typescript.md file)
// Permalink: https://github.com/iamturns/eslint-config-airbnb-typescript/blob/303e346214847385bee4016367ff3b1b9978e337/lib/shared.js

import { Linter } from 'eslint';
import baseBestPracticesRules from './best-practices.ts';
import baseVariablesRules from './variables.ts';
import baseImportsRules from './imports.ts';

const rules = {
  // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
  '@typescript-eslint/naming-convention': [
    'error',
    // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
    {
      selector: 'variable',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
    },
    // Allow camelCase functions (23.2), and PascalCase functions (23.8)
    {
      selector: 'function',
      format: ['camelCase', 'PascalCase'],
    },
    // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
  ],

  // Replace Airbnb 'default-param-last' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.md
  'default-param-last': 'off',
  '@typescript-eslint/default-param-last': baseBestPracticesRules['default-param-last'],

  // Replace Airbnb 'no-empty-function' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
  'no-empty-function': 'off',
  '@typescript-eslint/no-empty-function': baseBestPracticesRules['no-empty-function'],

  // Replace Airbnb 'no-loop-func' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
  'no-loop-func': 'off',
  '@typescript-eslint/no-loop-func': baseBestPracticesRules['no-loop-func'],

  // Replace Airbnb 'no-shadow' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': baseVariablesRules['no-shadow'],

  // Replace Airbnb 'no-unused-vars' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': baseVariablesRules['no-unused-vars'],

  // Replace Airbnb 'no-use-before-define' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': baseVariablesRules['no-use-before-define'],

  // Replace Airbnb 'require-await' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
  'require-await': 'off',
  '@typescript-eslint/require-await': baseBestPracticesRules['require-await'],

  // Replace Airbnb 'no-return-await' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
  'no-return-await': 'off',
  '@typescript-eslint/return-await': ['error', 'in-try-catch'],

  // Append 'ts' and 'tsx' to Airbnb 'import-x/extensions' rule
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
  'import-x/extensions': [
    baseImportsRules['import-x/extensions'][0],
    baseImportsRules['import-x/extensions'][1],
    {
      ...baseImportsRules['import-x/extensions'][2],
      ts: 'never',
      tsx: 'never',
    },
  ],

  // Append 'ts' and 'tsx' extensions to Airbnb 'import-x/no-extraneous-dependencies' rule
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
  'import-x/no-extraneous-dependencies': [
    baseImportsRules['import-x/no-extraneous-dependencies'][0],
    {
      ...baseImportsRules['import-x/no-extraneous-dependencies'][1],
      devDependencies: baseImportsRules[
        'import-x/no-extraneous-dependencies'
      ][1].devDependencies.reduce<string[]>((result, devDep) => {
        const toAppend = [devDep];
        const devDepWithTs = devDep.replace(/\bjs(x?)\b/g, 'ts$1');
        if (devDepWithTs !== devDep) {
          toAppend.push(devDepWithTs);
        }
        return [...result, ...toAppend];
      }, []),
    },
  ],
} satisfies Linter.RulesRecord;

export default rules;
