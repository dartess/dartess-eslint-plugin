/**
 * @fileoverview Disallow the use of `PropsWithChildren` utility type in favor explicit types
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/no-props-with-children-type.ts';
import { makeRuleTester } from '../utils/makeRuleTester.ts';

const ruleTester = makeRuleTester();
ruleTester.run('no-props-with-children-type', rule, {
  valid: [
    {
      code: `type ModalProps = {
  title: string;
  children: React.ReactNode;
}`,
    },
  ],

  invalid: [
    {
      code: 'type ModalProps = PropsWithChildren<{ title: string }>;',
      errors: [{ messageId: 'unexpectedPropsWithChildren' }],
    },
    {
      code: 'type ModalProps = React.PropsWithChildren<{ title: string }>;',
      errors: [{ messageId: 'unexpectedPropsWithChildren' }],
    },
  ],
});
