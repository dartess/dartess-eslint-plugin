import { ESLintUtils } from '@typescript-eslint/utils';

/**
 * @fileoverview Enforce (or forbid) named tuple elements
 * @author Sergey Kozlov
 */

type Options = [
  mainOptions: {
    mode?: 'always' | 'never';
  },
];
type MessageIds = 'requireNames' | 'forbidNames';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'ts-named-tuple-elements',
  defaultOptions: [{ mode: 'always' }],
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforces consistent usage of named elements in TypeScript tuple types.',
    },
    messages: {
      requireNames: 'Tuple elements must have names.',
      forbidNames: 'Tuple elements must not have names.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          mode: {
            type: 'string',
            enum: ['always', 'never'],
            default: 'always',
          },
        },
      },
    ],
  },

  create(context) {
    const [options] = context.options;
    const { mode = 'always' } = options ?? {};

    switch (mode) {
      case 'always':
        return {
          'TSTupleType > :not(TSNamedTupleMember)': node => {
            context.report({ node, messageId: 'requireNames' });
          },
        };

      case 'never':
        return {
          'TSTupleType > TSNamedTupleMember': node => {
            context.report({ node, messageId: 'forbidNames' });
          },
        };

      default:
        throw new Error(`Invalig mode value: ${String(mode)}`);
    }
  },
});
