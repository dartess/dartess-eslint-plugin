import { ESLintUtils } from '@typescript-eslint/utils';

/**
 * @fileoverview Enforce using arrow functions for binging `this` to actions
 * @author Sergey Kozlov
 */

type Options = [];
type MessageIds = 'noActionBound';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'mobx-no-action-bound',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce using arrow functions for binging `this` to actions',
    },
    messages: {
      noActionBound: 'rewrite action with arrow function for binding `this`',
    },
    schema: [],
  },

  create(context) {
    return {
      "Decorator[expression.object.name='action'][expression.property.name='bound']": function (
        node,
      ) {
        context.report({
          node,
          messageId: 'noActionBound',
        });
      },
    };
  },
});
