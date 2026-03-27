/**
 * @fileoverview Disallow the use of `PropsWithChildren` utility type in favor explicit types
 * @author Sergey Kozlov
 */

import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

import { exhaustiveCheck } from './utils/exhaustiveCheck.ts';

type Options = [];
type MessageIds = 'unexpectedPropsWithChildren';

function getTypeName(tsEntityName: TSESTree.EntityName) {
  switch (tsEntityName.type) {
    case AST_NODE_TYPES.Identifier:
      return tsEntityName.name;

    case AST_NODE_TYPES.TSQualifiedName:
      return tsEntityName.right.name;

    case AST_NODE_TYPES.ThisExpression:
      return null;

    default:
      exhaustiveCheck(tsEntityName);
  }
}

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'no-props-with-children-type',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow the use of PropsWithChildren utility type. Prefer explicit children prop typing instead.',
    },
    messages: {
      unexpectedPropsWithChildren:
        'Do not use PropsWithChildren. Type the children prop explicitly instead.',
    },
    schema: [],
  },

  create(context) {
    return {
      TSTypeReference(node) {
        const name = getTypeName(node.typeName);

        if (name === 'PropsWithChildren') {
          context.report({
            node,
            messageId: 'unexpectedPropsWithChildren',
          });
        }
      },
    };
  },
});
