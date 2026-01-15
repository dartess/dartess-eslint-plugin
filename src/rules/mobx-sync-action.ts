import { ESLintUtils } from '@typescript-eslint/utils';

/**
 * @fileoverview Enforce synchronous actions
 * @author Sergey Kozlov
 */

type Options = [];
type MessageIds = 'requireSyncAction';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'mobx-sync-action',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description: 'Mobx methods marked as `@action` must must be synchronous.',
    },
    messages: {
      requireSyncAction: '`action` must be synchronous function',
    },
    schema: [],
  },

  create(context) {
    const selector = [
      'MethodDefinition[value.async="true"] Decorator[expression.object.name="action"]',
      'MethodDefinition[value.async="true"] Decorator[expression.name="action"]',
      'PropertyDefinition[value.type="ArrowFunctionExpression"][value.async="true"] Decorator[expression.object.name="action"]',
      'PropertyDefinition[value.type="ArrowFunctionExpression"][value.async="true"] Decorator[expression.name="action"]',
    ].join(', ');
    return {
      [selector]: node => {
        context.report({ node, messageId: 'requireSyncAction' });
      },
    };
  },
});
