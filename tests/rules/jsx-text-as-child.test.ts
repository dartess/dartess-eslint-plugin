/**
 * @fileoverview Disallows text as child in JSX elements, except specified characters like emojis, digits, special symbols and extra strings
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/jsx-text-as-child.ts';

import { makeRuleTester } from './utils/makeRuleTester.ts';

const ruleTester = makeRuleTester({ jsx: true });
ruleTester.run('jsx-text-as-child', rule, {
  valid: [
    '<div>{t(some)}</div>',
    '<div/>',
    '<Some>{t(some)}</Some>',
    '<Some/>',
    `<div>
        {t(some)}
    </div>`,
    `<div>
        {t(foo)} {t(bar)}
    </div>`,
    {
      code: '<div>~{getValue()}</div>',
      options: [{ allowSpecialSymbols: true }],
    },
    {
      code: '<div>42</div>',
      options: [{ allowDigits: true }],
    },
    {
      code: '<div>{t(some)} 42</div>',
      options: [{ allowDigits: true }],
    },
    {
      code: '<div>💩</div>',
      options: [{ allowEmoji: true }],
    },
    {
      code: '<div>{t(some)} 💩</div>',
      options: [{ allowEmoji: true }],
    },
    {
      code: '<div>{value}x USDT</div>',
      options: [{ allowExtraStrings: ['x', 'USDT'] }],
    },
  ],

  invalid: [
    {
      code: '<div>Hello world</div>',
      errors: [{ messageId: 'textAsChild' }],
    },
    {
      code: '<>Hello world</>',
      errors: [{ messageId: 'textAsChild' }],
    },
    {
      code: '<div>你好世界</div>',
      errors: [{ messageId: 'textAsChild' }],
    },
    {
      code: '<div>~{getValue()}</div>',
      errors: [{ messageId: 'textAsChild' }],
    },
    {
      code: '<div>~{getValue()}</div>',
      options: [{ allowSpecialSymbols: true, disallowedSymbols: ['~'] }],
      errors: [{ messageId: 'disallowedSymbols' }],
    },
    {
      code: '<div>42</div>',
      errors: [{ messageId: 'textAsChild' }],
    },
    {
      code: '<div>💩</div>',
      errors: [{ messageId: 'textAsChild' }],
    },
    {
      code: '<div>{value}X USDT</div>',
      options: [{ allowExtraStrings: ['x', 'USDT'] }],
      errors: [{ messageId: 'textAsChild' }],
    },
  ],
});
