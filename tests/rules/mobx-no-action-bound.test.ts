/**
 * @fileoverview Enforce using arrow functions for binging `this` to actions
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/mobx-no-action-bound.ts';
import { makeRuleTester } from '../utils/makeRuleTester.ts';

const ruleTester = makeRuleTester();
ruleTester.run('mobx-no-action-bound', rule, {
  valid: [
    {
      code: `class Store {
  @action
  reset = () => {
    this.value = null;
  };
}`,
    },
  ],

  invalid: [
    {
      code: `class Store {
  @action.bound
  reset() {
    this.value = null;
  };
}`,
      errors: [{ messageId: 'noActionBound' }],
    },
  ],
});
