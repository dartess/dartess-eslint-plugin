/**
 * @fileoverview Wrapping components in `observer` must comply with the regulations
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/mobx-strict-observable-components-declaration.ts';
import { makeRuleTester } from '../utils/makeRuleTester.ts';

const ruleTester = makeRuleTester();
ruleTester.run('mobx-strict-observable-components-declaration', rule, {
  valid: [
    'const Component = observer(function Component() {})',
    {
      code: 'const Component = observer(forwardRef(() => null))',
      options: [{ ignoreObserverArg: ['forwardRef'] }],
    },
    {
      code: 'const Component = hoc(observer(function Component() {}))',
      options: [{ allowedHocs: ['hoc'] }],
    },
  ],

  invalid: [
    {
      code: 'const fn = () => {}; const Component = observer(fn);',
      errors: [{ messageId: 'observedIsInlined' }],
    },
    {
      code: 'const Component = observer(() => null)',
      errors: [{ messageId: 'observedIsFE' }],
    },
    {
      code: 'const Component = observer(function() {})',
      errors: [{ messageId: 'observedIsNamed' }],
    },
    {
      code: 'console.log(observer(function Component() {}))',
      errors: [{ messageId: 'componentIsNamed' }],
    },
    {
      code: 'const ComponentFoo = observer(function ComponentBar() {})',
      errors: [{ messageId: 'componentIsNamedAsObserved' }],
    },
    {
      code: 'const Component = observer(forwardRef(() => null))',
      errors: [{ messageId: 'observedIsFE' }],
    },
    {
      code: 'const Component = observer(someFn(() => null))',
      errors: [{ messageId: 'extraCallsAsParam', data: { callName: 'someFn' } }],
      options: [{ ignoreObserverArg: ['forwardRef'] }],
    },
    {
      code: 'const Component = hoc(observer(function Component() {}))',
      errors: [{ messageId: 'componentIsNamed' }],
    },
    {
      code: 'const Component = hoc(observer(function Component() {}))',
      errors: [{ messageId: 'componentIsNamed' }],
      options: [{ allowedHocs: ['some'] }],
    },
  ],
});
