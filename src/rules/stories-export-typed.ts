import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';

/**
 * @fileoverview Stories exports should include type checking using `Story` or `StoryObj`
 * @author Sergey Kozlov
 */

const validStoryNames = ['Story', 'StoryObj'];
const validStoryNamesString = validStoryNames.map(name => `\`${name}\``).join(' or ');

type Options = [];
type MessageIds = 'exportStoryType';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'stories-export-typed',
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    docs: {
      description: `Stories exports should include type checking using ${validStoryNamesString}`,
    },
    messages: {
      exportStoryType: `stories \`export\` should be typed as ${validStoryNamesString}`,
    },
    schema: [],
  },

  create(context) {
    return {
      ExportNamedDeclaration: node => {
        if (!node.declaration || !('declarations' in node.declaration)) {
          return;
        }
        const nodeStoryId = node.declaration.declarations[0].id;
        const { typeAnnotation } = nodeStoryId;

        if (nodeStoryId) {
          if (
            typeAnnotation?.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
            typeAnnotation?.typeAnnotation?.typeName.type === AST_NODE_TYPES.Identifier &&
            validStoryNames.includes(typeAnnotation?.typeAnnotation?.typeName?.name)
          ) {
            return;
          }
          if (typeAnnotation) {
            context.report({
              node: typeAnnotation,
              messageId: 'exportStoryType',
            });
          } else {
            context.report({
              node: nodeStoryId,
              messageId: 'exportStoryType',
            });
          }
        }
      },
    };
  },
});
