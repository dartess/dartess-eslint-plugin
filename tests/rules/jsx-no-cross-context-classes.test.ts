/**
 * @fileoverview Prevent mixing of outer and inner classes to avoid dependency on style order
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/jsx-no-cross-context-classes.ts';
import { makeRuleTester } from '../utils/makeRuleTester.ts';

const ruleTester = makeRuleTester();
ruleTester.run('jsx-no-cross-context-classes', rule, {
  valid: [
    {
      code: 'cn(className, anotherClassName)',
      options: [{ fn: 'cn' }],
    },
    {
      code: 'clsx(className, anotherClassName)',
      options: [{ fn: 'clsx' }],
    },
    {
      code: 'cn(styles.root, styles.classItem)',
      options: [{ fn: 'cn' }],
    },
    {
      code: "import cn from 'classnames'",
      options: [{ fn: 'cn' }],
    },
  ],

  invalid: [
    {
      code: 'cn(styles.root, className)',
      options: [{ fn: 'cn' }],
      errors: [{ messageId: 'avoidMix' }],
    },
    {
      code: 'cn(styles.root, someItemClassName)',
      options: [{ fn: 'cn' }],
      errors: [{ messageId: 'avoidMix' }],
    },
    {
      code: 'cn(styles.root, props.className)',
      options: [{ fn: 'cn' }],
      errors: [{ messageId: 'avoidMix' }],
    },
    {
      code: 'cn(styles.root, props.obj.className)',
      options: [{ fn: 'cn' }],
      errors: [{ messageId: 'avoidMix' }],
    },
    {
      code: 'cn(styles.root, props.someItemClassName)',
      options: [{ fn: 'cn' }],
      errors: [{ messageId: 'avoidMix' }],
    },
  ],
});
