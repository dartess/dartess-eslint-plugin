import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

/**
 * @fileoverview Disallows text as child in JSX elements, except specified characters like emojis, digits, special symbols and extra strings
 * @author Sergey Kozlov
 */

import emojiRegex from 'emoji-regex';

type Options = [
  {
    allowDigits?: boolean;
    allowEmoji?: boolean;
    allowSpecialSymbols?: boolean;
    allowExtraStrings?: string[];
    disallowedSymbols?: string[];
  },
];
type MessageIds = 'textAsChild' | 'disallowedSymbols';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'jsx-text-as-child',
  defaultOptions: [{}],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow JSX elements to have text as a child, except for specified allowed characters',
    },
    messages: {
      textAsChild:
        'JSX elements should not have text without translation; disable for file and add TODO to comment during development.',
      disallowedSymbols:
        'According to the disallowedSymbols option, some symbols are prohibited. Check the option and choose an alternative.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowExtraStrings: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          allowEmoji: {
            type: 'boolean',
          },
          allowDigits: {
            type: 'boolean',
          },
          allowSpecialSymbols: {
            type: 'boolean',
          },
          disallowedSymbols: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    ],
  },

  create(context) {
    const allowedRegexpParts = [' '];
    const [options] = context.options;
    if (options?.allowDigits) {
      allowedRegexpParts.push('[0-9]');
    }
    if (options?.allowEmoji) {
      allowedRegexpParts.push(`(${emojiRegex().source})`);
    }
    if (options?.allowSpecialSymbols) {
      allowedRegexpParts.push(
        ...'`-=[];\\\',./~!@#$%^&*()_+{}|:"<>?№–≈—…'.split('').map(c => `\\${c}`),
      );
    }
    if (options?.allowExtraStrings) {
      allowedRegexpParts.push(...options.allowExtraStrings.map(str => `(${str})`));
    }

    const allowedRegexp = new RegExp(`^(${allowedRegexpParts.join('|')})+$`);
    const disallowedRegexp = options?.disallowedSymbols
      ? new RegExp(`(${options.disallowedSymbols.join('|')})+`)
      : null;

    const checkChildren = (children: TSESTree.JSXChild[]) => {
      children
        .filter((node): node is TSESTree.JSXText => node.type === AST_NODE_TYPES.JSXText)
        .map(node => ({ node, text: node.value.trim() }))
        .filter(({ text }) => text !== '')
        .forEach(({ node, text }) => {
          if (!allowedRegexp.test(text)) {
            context.report({ node, messageId: 'textAsChild' });
          }

          if (disallowedRegexp?.test(text)) {
            context.report({ node, messageId: 'disallowedSymbols' });
          }
        });
    };

    return {
      JSXElement(node) {
        checkChildren(node.children);
      },
      JSXFragment(node) {
        checkChildren(node.children);
      },
    };
  },
});
