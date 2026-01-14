import { ESLintUtils } from '@typescript-eslint/utils';

/**
 * @fileoverview Enforce synchronous autorun callback
 * @author Sergey Kozlov
 */

type Options = [];
type MessageIds = 'requireSyncAutorun';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'mobx-sync-autorun',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        "Autorun tracks only the observables that are read during the synchronous execution of the provided function, but it won't track anything that happens asynchronously.",
    },
    messages: {
      requireSyncAutorun: '`effect` must be synchronous function',
    },
    schema: [],
  },

  create(context) {
    const selector = [
      'CallExpression[callee.name="autorun"] > ArrowFunctionExpression[async="true"]',
      'CallExpression[callee.name="autorun"] > FunctionExpression[async="true"]',
    ].join(', ');
    return {
      [selector]: node => {
        context.report({ node, messageId: 'requireSyncAutorun' });
      },
    };
  },
});
