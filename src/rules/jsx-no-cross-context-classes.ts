import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';

/**
 * @fileoverview Prevent mixing of outer and inner classes to avoid dependency on style order
 * @author Sergey Kozlov
 */

type Options = [
  mainOptions: {
    libName?: string;
  },
];
type MessageIds = 'avoidMix' | 'avoidRenaming';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'jsx-no-cross-context-classes',
  defaultOptions: [{}],
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow passing the className prop to components from outside to enforce encapsulation of styles and prevent unintended styling overrides.',
    },
    messages: {
      avoidMix:
        'Avoid mixing outer and inner classes on the same element. The import order of the style is not guaranteed, so the order in which the style is applied is also not guaranteed.',
      avoidRenaming: "'{{ libName }}' must be imported as 'cn'",
    },
    schema: [
      {
        type: 'object',
        properties: {
          libName: {
            type: 'string',
          },
        },
        required: ['libName'],
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const [options] = context.options;
    const libName = options?.libName;

    if (!libName || typeof libName !== 'string') {
      throw new Error('libName option is required and must be a string');
    }

    const isClassLike = (string: string) => /class/i.exec(string);
    return {
      CallExpression(node) {
        if (!('name' in node.callee) || node.callee.name !== 'cn') {
          return;
        }
        const hasStylesItem = node.arguments.some(
          arg =>
            arg.type === AST_NODE_TYPES.MemberExpression &&
            'name' in arg.object &&
            arg.object.name === 'styles',
        );
        const hasClassLikeItem = node.arguments.some(arg => {
          const isClassLikeIdentifier =
            arg.type === AST_NODE_TYPES.Identifier && isClassLike(arg.name);
          const isClassLikeProp =
            arg.type === AST_NODE_TYPES.MemberExpression &&
            (!('name' in arg.object) || arg.object.name !== 'styles') &&
            'name' in arg.property &&
            isClassLike(arg.property.name);
          return Boolean(isClassLikeIdentifier || isClassLikeProp);
        });
        if (hasStylesItem && hasClassLikeItem) {
          context.report({
            node,
            messageId: 'avoidMix',
          });
        }
      },
      ImportDeclaration(node) {
        if (node.source.value !== libName) {
          return;
        }
        if (node.specifiers[0].local.name === 'cn') {
          return;
        }
        context.report({
          node,
          messageId: 'avoidRenaming',
          data: { libName },
        });
      },
    };
  },
});
