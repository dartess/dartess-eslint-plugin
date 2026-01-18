/**
 * @fileoverview Enforce synchronous autorun callback
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/mobx-sync-autorun.ts';
import { makeRuleTester } from '../utils/makeRuleTester.ts';

const ruleTester = makeRuleTester();
ruleTester.run('mobx-sync-autorun', rule, {
  valid: [
    {
      code: 'autorun(() => {})',
    },
    {
      code: 'autorun(function() {})',
    },
  ],

  invalid: [
    {
      code: 'autorun(async () => {})',
      errors: [{ messageId: 'requireSyncAutorun' }],
    },
    {
      code: 'autorun(async function() {})',
      errors: [{ messageId: 'requireSyncAutorun' }],
    },
  ],
});
