/**
 * @fileoverview Enforce synchronous actions
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/mobx-sync-action.ts';
import { makeRuleTester } from '../utils/makeRuleTester.ts';

const ruleTester = makeRuleTester();
ruleTester.run('mobx-sync-action', rule, {
  valid: [
    {
      code: 'class Store { @action method1() {}; }',
    },
    {
      code: 'class Store { @action.bound method2() {}; }',
    },
    {
      code: 'class Store { @action method3 = () => {}; }',
    },
    {
      code: 'class Store { @action.bound method4 = () => {}; }',
    },
  ],

  invalid: [
    {
      code: 'class Store { @action async method1() {}; }',
      errors: [{ messageId: 'requireSyncAction' }],
    },
    {
      code: 'class Store { @action.bound async method2() {}; }',
      errors: [{ messageId: 'requireSyncAction' }],
    },
    {
      code: 'class Store { @action method3 = async () => {}; }',
      errors: [{ messageId: 'requireSyncAction' }],
    },
    {
      code: 'class Store { @action.bound method4 = async () => {}; }',
      errors: [{ messageId: 'requireSyncAction' }],
    },
  ],
});
