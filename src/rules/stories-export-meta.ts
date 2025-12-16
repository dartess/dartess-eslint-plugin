import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';

/**
 * @fileoverview The default export should include type checking using `satisfy Meta`
 * @author Sergey Kozlov
 */

type Options = [];
type MessageIds = 'exportDefaultTypeCheck';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'stories-export-meta',
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    docs: {
      description: 'The default export should include type checking using `satisfy Meta`',
    },
    messages: {
      exportDefaultTypeCheck: '`export default` should be `satisfies Meta<typeof T>`',
    },
    schema: [],
  },

  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        const { declaration } = node;

        const hasSatisfies = declaration.type === AST_NODE_TYPES.TSSatisfiesExpression;

        const isMeta =
          hasSatisfies &&
          declaration.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
          declaration.typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier &&
          declaration.typeAnnotation.typeName.name === 'Meta';

        const isMetaWithParameter =
          isMeta &&
          declaration.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
          declaration.typeAnnotation.typeArguments &&
          declaration.typeAnnotation.typeArguments.params.length > 0;

        if (!hasSatisfies || !isMeta || !isMetaWithParameter) {
          context.report({
            node: declaration,
            messageId: 'exportDefaultTypeCheck',
          });
        }
      },
    };
  },
});
