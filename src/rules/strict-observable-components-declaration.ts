import { ESLintUtils, type TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils';

/**
 * @fileoverview The observable component must be an inline function.
 * @author Sergey Kozlov
 */

type Options = [
  {
    ignoreObserverArg?: Array<string>;
    allowedHocs?: Array<string>;
  },
];
type MessageIds =
  | 'observedIsInlined'
  | 'observedIsFE'
  | 'extraCallsAsParam'
  | 'observedIsNamed'
  | 'componentIsNamed'
  | 'componentIsNamedAsObserved';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'strict-observable-components-declaration',
  defaultOptions: [{}],
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow missed and wrong named `observer` components.',
    },
    messages: {
      observedIsInlined: 'The component must be an inline function.',
      observedIsFE: 'The component must be a function expression.',
      extraCallsAsParam: `Passing the result of a function call '{{ callName }}' is not allowed by 'ignoreObserverArg' option.`,
      observedIsNamed: 'The component must be a named function expression.',
      componentIsNamed: 'The return value from the observer must be assigned to a variable.',
      componentIsNamedAsObserved:
        'The name of the observable component and the name of the variable must match.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          ignoreObserverArg: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          allowedHocs: {
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
    const getParent = (node: TSESTree.CallExpression, allowedHocs?: Array<string>) => {
      let { parent } = node;
      if (!allowedHocs) {
        return parent;
      }

      while (
        parent.type === AST_NODE_TYPES.CallExpression &&
        'name' in parent.callee &&
        allowedHocs.includes(parent.callee.name)
      ) {
        parent = parent.parent;
      }

      return parent;
    };

    return {
      CallExpression(node) {
        if (!('name' in node.callee) || node.callee.name !== 'observer') {
          return;
        }
        const [arg] = node.arguments;
        const [options] = context.options;

        const wrongArgType = () => {
          context.report({
            node: arg,
            messageId: 'observedIsFE',
          });
        };

        switch (arg.type) {
          case AST_NODE_TYPES.Identifier: {
            context.report({
              node: arg,
              messageId: 'observedIsInlined',
            });
            break;
          }
          case AST_NODE_TYPES.CallExpression: {
            if (options?.ignoreObserverArg) {
              if ('name' in arg.callee && !options.ignoreObserverArg.includes(arg.callee.name)) {
                context.report({
                  node: arg,
                  messageId: 'extraCallsAsParam',
                  data: { callName: arg.callee.name },
                });
              }
            } else {
              wrongArgType();
            }
            break;
          }
          case AST_NODE_TYPES.FunctionExpression: {
            if (arg.id === null) {
              context.report({
                node: arg,
                messageId: 'observedIsNamed',
              });
              return;
            }
            const parent = getParent(node, options?.allowedHocs);
            if (parent && parent.type !== AST_NODE_TYPES.VariableDeclarator) {
              context.report({
                node,
                messageId: 'componentIsNamed',
              });
              return;
            }
            if (parent && 'name' in parent.id && arg.id?.name !== parent.id.name) {
              context.report({
                node: parent,
                messageId: 'componentIsNamedAsObserved',
              });
            }
            break;
          }
          default: {
            wrongArgType();
          }
        }
      },
    };
  },
});
