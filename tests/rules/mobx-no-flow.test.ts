/**
 * @fileoverview Disallow the use of MobX flow in favor of async/await with actions
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/mobx-no-flow.ts';
import { makeRuleTester } from '../utils/makeRuleTester.ts';

const ruleTester = makeRuleTester();
ruleTester.run('mobx-no-flow', rule, {
  valid: [
    {
      code: `import { action } from 'mobx';`,
    },
    {
      code: `import { flow } from 'some-other-lib';`,
    },
  ],

  invalid: [
    {
      code: `import { flow } from 'mobx';`,
      errors: [{ messageId: 'noFlow' }],
    },
    {
      code: `import { action, flow } from 'mobx';`,
      errors: [{ messageId: 'noFlow' }],
    },
    {
      code: `import { flow as f } from 'mobx';`,
      errors: [{ messageId: 'noFlow' }],
    },
    {
      code: `import * as mobx from 'mobx'; const wrap = mobx.flow(function* () {})`,
      errors: [{ messageId: 'noFlow' }],
    },
    {
      code: `import * as mobx from 'mobx'; const { flow } = mobx; class Store { @flow *fetchData() {} }`,
      errors: [{ messageId: 'noFlow' }],
    },
    {
      code: `import * as mobx from 'mobx'; mobx.makeObservable(this, { fetchData: mobx.flow })`,
      errors: [{ messageId: 'noFlow' }],
    },
    {
      code: `import { flow, makeObservable } from 'mobx'; makeObservable(this, { fetchData: flow })`,
      errors: [{ messageId: 'noFlow' }],
    },
  ],
});
