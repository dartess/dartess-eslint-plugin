/**
 * @fileoverview Prevent mixing of outer and inner classes to avoid dependency on style order
 * @author Sergey Kozlov
 */

import { makeRuleTester } from './utils/makeRuleTester.ts';

import rule from '../../src/rules/prevent-mixing-external-and-internal-classes.ts';

const ruleTester = makeRuleTester();
ruleTester.run('prevent-mixing-external-and-internal-classes', rule, {
  valid: [
    {
      code: 'cn(className, anotherClassName)',
      options: [{ libName: 'classnames' }],
    },
    {
      code: 'cn(styles.root, styles.classItem)',
      options: [{ libName: 'classnames' }],
    },
    {
      code: "import cn from 'classnames'",
      options: [{ libName: 'classnames' }],
    },
  ],

  invalid: [
    {
      code: 'cn(styles.root, className)',
      options: [{ libName: 'classnames' }],
      errors: [{ messageId: 'avoidMix' }],
    },
    {
      code: 'cn(styles.root, someItemClassName)',
      options: [{ libName: 'classnames' }],
      errors: [{ messageId: 'avoidMix' }],
    },
    {
      code: 'cn(styles.root, props.className)',
      options: [{ libName: 'classnames' }],
      errors: [{ messageId: 'avoidMix' }],
    },
    {
      code: 'cn(styles.root, props.obj.className)',
      options: [{ libName: 'classnames' }],
      errors: [{ messageId: 'avoidMix' }],
    },
    {
      code: 'cn(styles.root, props.someItemClassName)',
      options: [{ libName: 'classnames' }],
      errors: [{ messageId: 'avoidMix' }],
    },
    {
      code: "import classnames from 'classnames'",
      options: [{ libName: 'classnames' }],
      errors: [{ messageId: 'avoidRenaming' }],
    },
    {
      code: "import classnames from 'clsx'",
      options: [{ libName: 'clsx' }],
      errors: [{ messageId: 'avoidRenaming' }],
    },
  ],
});
