import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

/**
 * @fileoverview Disallow relative imports going up more than a specified number of parent directories.
 * @author Sergey Kozlov
 */

type Options = [];
type MessageIds = 'tooDeep';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'imports-max-parent-depth',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow relative imports going up more than a specified number of parent directories.',
    },
    messages: {
      tooDeep:
        'Import from {{ level }} parent levels is not allowed. Maximum allowed is {{ maxParentImportLevels }}.',
    },
    schema: [],
  },

  create(context) {
    const { maxParentImportLevels = 2 } = context.settings as { maxParentImportLevels?: number };

    const checkSource = (
      node:
        | TSESTree.ImportDeclaration
        | TSESTree.ExportAllDeclaration
        | TSESTree.ExportNamedDeclaration
        | TSESTree.ImportExpression,
      source: TSESTree.StringLiteral,
    ) => {
      const importPath = source.value;

      if (!importPath.startsWith('../')) {
        return;
      }

      const level = importPath.split('../').length - 1;

      if (level > maxParentImportLevels) {
        context.report({
          node: source,
          messageId: 'tooDeep',
          data: { level, maxParentImportLevels },
        });
      }
    };

    return {
      ImportDeclaration(node) {
        checkSource(node, node.source);
      },
      ExportAllDeclaration(node) {
        checkSource(node, node.source);
      },
      ExportNamedDeclaration(node) {
        if (node.source) {
          checkSource(node, node.source);
        }
      },
      ImportExpression(node) {
        if (node.source.type === AST_NODE_TYPES.Literal) {
          checkSource(node, node.source as TSESTree.StringLiteral);
        }
      },
    };
  },
});
