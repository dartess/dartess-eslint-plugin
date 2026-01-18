/**
 * @fileoverview Enforce (or forbid) named tuple elements
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/ts-named-tuple-elements.ts';
import { makeRuleTester } from '../utils/makeRuleTester.ts';

const ruleTester = makeRuleTester();
ruleTester.run('ts-named-tuple-elements', rule, {
  valid: [
    {
      code: 'type Location = [lat: number, long: number]',
    },
    {
      code: 'type Location = []',
    },
    {
      code: 'type Location = [lat: number, long: number]',
      options: [{ mode: 'always' }],
    },
    {
      code: 'type Location = [number, number]',
      options: [{ mode: 'never' }],
    },
    {
      code: 'type Location = []',
      options: [{ mode: 'never' }],
    },
  ],

  invalid: [
    {
      code: 'type Location = [number, number]',
      errors: [{ messageId: 'requireNames' }, { messageId: 'requireNames' }],
    },
    {
      code: 'type Location = [lat: number, number]',
      errors: [{ messageId: 'requireNames' }],
    },
    {
      code: 'type Location = [number, number]',
      options: [{ mode: 'always' }],
      errors: [{ messageId: 'requireNames' }, { messageId: 'requireNames' }],
    },
    {
      code: 'type Location = [lat: number, long: number]',
      options: [{ mode: 'never' }],
      errors: [{ messageId: 'forbidNames' }, { messageId: 'forbidNames' }],
    },
    {
      code: 'type Location = [lat: number, number]',
      options: [{ mode: 'never' }],
      errors: [{ messageId: 'forbidNames' }],
    },
  ],
});
